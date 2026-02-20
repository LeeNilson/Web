"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.minhaFuncao = minhaFuncao;
function fetchBancos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://brasilapi.com.br/api/banks/v1');
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            const data = yield response.json();
            showBancos(data);
        }
        catch (error) {
            console.error('Falha ao buscar bancos:', error);
        }
    });
}
function showBancos(bancos) {
    const lista = bancos
        .filter(banco => banco.name)
        .map(banco => {
        var _a;
        return `
            <div class="banco-card">
                <h2>${banco.name}</h2>
                <p><strong>Nome completo:</strong> ${banco.fullName}</p>
                <p><strong>Código:</strong> ${(_a = banco.code) !== null && _a !== void 0 ? _a : 'N/A'}</p>
                <p><strong>ISPB:</strong> ${banco.ispb}</p>
            </div>
        `;
    })
        .join('');
    document.body.innerHTML = `<div class="lista">${lista}</div>`;
}
fetchBancos();
// script.js
function minhaFuncao() {
    console.log("Função exportada!");
}
//# sourceMappingURL=script.js.map