const { jsPDF } = window.jspdf;

const gerarPDF = (empresa, cnpj, produto, quantidade, precoUnitario, total, situacao) => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;

    // Título
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(34, 197, 94);
    doc.text('OrçaFácil', pageWidth / 2, 25, { align: 'center' });

    // Informações principais
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Empresa: ${empresa}`, margin, 40);
    doc.text(`CNPJ: ${cnpj}`, margin, 48);
    doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, pageWidth - margin, 40, { align: 'right' });

    // Tabela
    const tableY = 60;
    const headers = ['Produto', 'Qtd', 'Preço Unitário', 'Total', 'Situação'];
    const colWidths = [60, 20, 35, 35, 40];
    const rowHeight = 10;

    doc.setFillColor(34, 197, 94);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');

    let x = margin;
    headers.forEach((h, i) => {
    doc.rect(x, tableY, colWidths[i], rowHeight, 'F');
    doc.text(h, x + 2, tableY + 7);
    x += colWidths[i];
    });

    // Dados
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    x = margin;
    const dados = [produto, quantidade, precoUnitario, total, situacao];
    dados.forEach((d, i) => {
    doc.rect(x, tableY + rowHeight, colWidths[i], rowHeight);
    doc.text(String(d), x + 2, tableY + rowHeight + 7);
    x += colWidths[i];
    });

    // Observações
    const obsY = tableY + rowHeight * 2 + 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Observações:', margin, obsY);
    const observacoes = [
    '- Este orçamento é válido por 10 dias úteis.',
    '- Assinatura digital disponível via plataforma.',
    '- Pagamento: 50% na aprovação e 50% na entrega.'
    ];
    observacoes.forEach((linha, i) => {
    doc.text(linha, margin + 5, obsY + 8 + i * 6);
    });

    // Rodapé
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, pageHeight - 17, pageWidth - margin, pageHeight - 17);
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text('OrçaFácil © 2025 — contato@orcafacil.com | (11) 1234-5678', pageWidth / 2, pageHeight - 10, { align: 'center' });

    // Salvar PDF
    doc.save(`Orcamento_${empresa.replace(/\s/g, '_')}.pdf`);
}
