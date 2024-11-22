const denominations = [
    { value: 0.1, img: './img/01-yb.png', label: '硬币' },
    { value: 0.5, img: './img/05-yb.png', label: '硬币' },
    { value: 1, img: './img/1-yb.png', label: '硬币' },
    { value: 0.5, img: './img/05-zb.png', label: '纸币' },
    { value: 1, img: './img/1-zb.png', label: '纸币' },
    { value: 5, img: './img/5-zb.png', label: '纸币' },
    { value: 10, img: './img/10-zb.png', label: '纸币' },
    { value: 20, img: './img/20-zb.png', label: '纸币' },
    { value: 50, img: './img/50-zb.png', label: '纸币' },
    { value: 100, img: './img/100-zb.png', label: '纸币' }
];

let total = 0;
const counts = Array(denominations.length).fill(0);
const history = []; // 用于撤销功能的历史记录

const container = document.getElementById('buttons-container');
const result = document.getElementById('result');

// 生成按钮
denominations.forEach((denomination, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'btn-wrapper';

    const button = document.createElement('button');
    button.className = 'btn';
    button.innerHTML = `
        <img src="${denomination.img}" alt="${denomination.value}元">
        <span>${denomination.value} 元</span>
    `;
    button.onclick = () => {
        counts[index]++;
        total += denomination.value;
        history.push({ index, value: denomination.value }); // 保存历史操作
        updateUI();
    };

    const countText = document.createElement('div');
    countText.className = 'count';
    countText.id = `count-${index}`;
    countText.textContent = `0 ${denomination.label === '纸币' ? '张' : '枚'}`;

    wrapper.appendChild(button);
    wrapper.appendChild(countText);
    container.appendChild(wrapper);
});

// 更新界面显示
function updateUI() {
    counts.forEach((count, index) => {
        const countText = document.getElementById(`count-${index}`);
        countText.textContent = `${count} ${denominations[index].label === '纸币' ? '张' : '枚'}`;
    });
    result.textContent = `总金额：${total.toFixed(2)} 元`;
}

// 复制数据到剪贴板
document.getElementById('copy-data').onclick = () => {
    let text = '';
    counts.forEach((count, index) => {
        text += `${denominations[index].value}元${denominations[index].label}${count}个\n`;
    });
    text += `总计：${total.toFixed(2)} 元`;
    navigator.clipboard.writeText(text).then(() => {
        alert('数据已复制到剪贴板！');
    }).catch(() => {
        alert('复制失败！');
    });
};

// 重置数据
document.getElementById('reset-data').onclick = () => {
    if (confirm('确认重置所有数据吗？')) {
        counts.fill(0);
        total = 0;
        history.length = 0; // 清空历史记录
        updateUI();
    }
};

// 撤销上一步操作
document.getElementById('undo-last').onclick = () => {
    if (history.length > 0) {
        const lastAction = history.pop(); // 删除最后一个操作
        counts[lastAction.index]--;
        total -= lastAction.value;
        updateUI();
    } else {
        alert('没有可以撤销的操作！');
    }
};
