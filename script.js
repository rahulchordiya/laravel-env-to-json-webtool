// JavaScript to handle .env to JSON conversion and clipboard copy
document.getElementById('convertButton').addEventListener('click', () => {
    const envInput = document.getElementById('envInput').value;
    const jsonOutput = document.getElementById('jsonOutput');
    const lines = envInput.split('\n');
    const result = {};

    lines.forEach(line => {
        line = line.trim();
        // Skip empty lines and comments
        if (!line || line.startsWith('#')) return;

        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            let value = valueParts.join('=').trim();

            // Remove surrounding quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }

            result[key.trim()] = value;
        }
    });

    jsonOutput.value = JSON.stringify(result, null, 4);
});

// Clipboard copy functionality
document.getElementById('copyButton').addEventListener('click', () => {
    const jsonOutput = document.getElementById('jsonOutput');
    if (jsonOutput.value) {
        jsonOutput.select();
        document.execCommand('copy');

        const copyButton = document.getElementById('copyButton');
        copyButton.textContent = 'Copied!';
        setTimeout(() => (copyButton.textContent = 'Copy'), 2000);
    }
});
