const screen = document.getElementById('screen');

function insert(value) {
    if (screen.value === 'Error') {
        screen.value = '';
    }
    screen.value += value;
}

function clearScreen() {
    screen.value = '';
}

function backspace() {
    if (screen.value === 'Error') {
        screen.value = '';
    } else {
        screen.value = screen.value.slice(0, -1);
    }
}

function calculate() {
    let expression = screen.value;
    if (!expression) return;

    if (expression.replace(/\s/g, '') === '12345+0') {
        document.getElementById('easter-modal').style.display = 'flex';
        screen.value = '';
        return;
    }

    let evalStr = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-')
        .replace(/\^/g, '**')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/√\(/g, 'Math.sqrt(');

    try {
        let result = new Function('return ' + evalStr)();
        
        if (result === undefined || Number.isNaN(result) || !Number.isFinite(result)) {
            screen.value = 'Error';
            return;
        }

        // Handle JS float precision issues (e.g., 0.1 + 0.2)
        if (!Number.isInteger(result)) {
            result = parseFloat(result.toFixed(10));
        }

        screen.value = result;
    } catch (err) {
        screen.value = 'Error';
    }
}

function closeModal() {
    document.getElementById('easter-modal').style.display = 'none';
}
