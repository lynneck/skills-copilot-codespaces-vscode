/**
 * Invoice Generator Demo
 * Demonstração do Gerador de Faturas
 */

const InvoiceGenerator = require('./invoiceGenerator');

// Create a new invoice generator instance
const generator = new InvoiceGenerator();

// Example 1: Simple invoice
console.log('=== Exemplo 1: Fatura Simples ===');

const customer1 = {
    name: 'João Silva',
    email: 'joao.silva@example.com',
    address: 'Rua das Flores, 123, Lisboa',
    taxId: '123456789'
};

const items1 = [
    { description: 'Serviço de Consultoria', quantity: 10, price: 50.00 },
    { description: 'Desenvolvimento de Software', quantity: 20, price: 75.00 }
];

const invoice1 = generator.generateInvoice(customer1, items1);
console.log(generator.formatInvoice(invoice1));

// Example 2: Invoice with tax and discount
console.log('\n=== Exemplo 2: Fatura com IVA e Desconto ===');

const customer2 = {
    name: 'Maria Santos',
    email: 'maria.santos@example.com',
    address: 'Avenida da Liberdade, 456, Porto',
    taxId: '987654321'
};

const items2 = [
    { description: 'Laptop Dell XPS 15', quantity: 2, price: 1200.00 },
    { description: 'Mouse Wireless', quantity: 2, price: 25.00 },
    { description: 'Teclado Mecânico', quantity: 2, price: 80.00 }
];

const invoice2 = generator.generateInvoice(customer2, items2, {
    taxRate: 23,  // IVA 23%
    discount: 10   // 10% discount
});
console.log(generator.formatInvoice(invoice2));

// Example 3: Save invoice to JSON file
console.log('\n=== Exemplo 3: Guardar Fatura em JSON ===');

const customer3 = {
    name: 'Empresa ABC Lda',
    email: 'contabilidade@abc.pt',
    address: 'Praça do Comércio, 789, Coimbra',
    taxId: '501234567'
};

const items3 = [
    { description: 'Licença de Software Anual', quantity: 5, price: 299.00 },
    { description: 'Suporte Técnico', quantity: 12, price: 50.00 }
];

const invoice3 = generator.generateInvoice(customer3, items3, { taxRate: 23 });
const filename = generator.saveInvoiceJSON(invoice3, 'invoice_1002.json');
console.log(`Fatura guardada em: ${filename}`);
console.log(generator.formatInvoice(invoice3));

console.log('\n✅ Demonstração completa!');
