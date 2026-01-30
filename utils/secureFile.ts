export const validateAndConvertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        // 1. Initial Size Validation (Max 10MB input to avoid browser crash)
        const MAX_INPUT_SIZE = 10 * 1024 * 1024; // 10MB
        if (file.size > MAX_INPUT_SIZE) {
            reject(new Error('O arquivo é muito grande (Máx 10MB).'));
            return;
        }

        // 2. MIME Type Validation
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
        if (!ALLOWED_TYPES.includes(file.type)) {
            reject(new Error('Formato de arquivo inválido. Use apenas JPG, PNG ou WEBP.'));
            return;
        }

        // 3. Magic Bytes Validation
        const reader = new FileReader();
        reader.onloadend = (e) => {
            if (!e.target?.result) {
                reject(new Error('Erro ao ler o arquivo.'));
                return;
            }

            const arr = (new Uint8Array(e.target.result as ArrayBuffer)).subarray(0, 4);
            let header = "";
            for (let i = 0; i < arr.length; i++) {
                header += arr[i].toString(16);
            }

            let isValid = false;
            if (header.startsWith('ffd8ff')) isValid = true; // JPEG
            if (header === '89504e47') isValid = true; // PNG
            if (header === '52494646') isValid = true; // WEBP

            if (!isValid) {
                reject(new Error('Arquivo corrompido ou inválido.'));
                return;
            }

            // 4. Compression & Resizing Logic
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    reject(new Error('Erro ao processar imagem (Canvas).'));
                    return;
                }

                // Calculation new dimensions (Max width 1920px)
                const MAX_WIDTH = 1920;
                let width = img.width;
                let height = img.height;

                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }

                canvas.width = width;
                canvas.height = height;

                // Draw and Compress
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to WebP with 0.8 quality (Great balance)
                const optimizedBase64 = canvas.toDataURL('image/webp', 0.8);
                resolve(optimizedBase64);
            };
            img.onerror = () => reject(new Error('Erro ao carregar a imagem para otimização.'));
        };
        reader.onerror = () => reject(new Error('Erro ao ler o arquivo.'));
        reader.readAsArrayBuffer(file);
    });
};
