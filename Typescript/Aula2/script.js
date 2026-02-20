
async function fetchBancos() {
    try {
        const response = await fetch('https://brasilapi.com.br/api/banks/v1');
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        const data = await response.json();
        showBancos(data);
    }
    catch (error) {
        console.error('Falha ao buscar bancos:', error);
    }
}
function showBancos(bancos) {
    const lista = bancos
        .filter(banco => banco.name)
        .map(banco => `
            <div class="banco-card">
                <h2>${banco.name}</h2>
                <p><strong>Nome completo:</strong> ${banco.fullName}</p>
                <p><strong>Código:</strong> ${banco.code ?? 'N/A'}</p>
                <p><strong>ISPB:</strong> ${banco.ispb}</p>
            </div>
        `)
        .join('');
    document.body.innerHTML = `<div class="lista">${lista}</div>`;
}
fetchBancos();
//# sourceMappingURL=script.js.map