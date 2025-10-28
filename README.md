# Invoice Generator / Gerador de Faturas

A simple and efficient invoice generator for creating professional invoices.

Um gerador de faturas simples e eficiente para criar faturas profissionais.

## Features / Funcionalidades

- ✅ Generate invoices with customer information / Gerar faturas com informação do cliente
- ✅ Support for multiple items per invoice / Suporte para múltiplos itens por fatura
- ✅ Automatic calculation of subtotals, taxes, and discounts / Cálculo automático de subtotais, impostos e descontos
- ✅ Format invoices for display / Formatação de faturas para exibição
- ✅ Save invoices as JSON files / Guardar faturas em ficheiros JSON
- ✅ Auto-incrementing invoice numbers / Numeração automática de faturas

## Installation / Instalação

```bash
# Clone the repository / Clonar o repositório
git clone https://github.com/lynneck/skills-copilot-codespaces-vscode.git
cd skills-copilot-codespaces-vscode

# No dependencies required! / Sem dependências necessárias!
```

## Usage / Utilização

### Basic Example / Exemplo Básico

```javascript
const InvoiceGenerator = require('./invoiceGenerator');

// Create a new invoice generator / Criar um novo gerador de faturas
const generator = new InvoiceGenerator();

// Define customer information / Definir informação do cliente
const customer = {
    name: 'João Silva',
    email: 'joao.silva@example.com',
    address: 'Rua das Flores, 123, Lisboa',
    taxId: '123456789'
};

// Define invoice items / Definir itens da fatura
const items = [
    { description: 'Consulting Service', quantity: 10, price: 50.00 },
    { description: 'Software Development', quantity: 20, price: 75.00 }
];

// Generate the invoice / Gerar a fatura
const invoice = generator.generateInvoice(customer, items);

// Display the invoice / Exibir a fatura
console.log(generator.formatInvoice(invoice));
```

### Invoice with Tax and Discount / Fatura com IVA e Desconto

```javascript
const invoice = generator.generateInvoice(customer, items, {
    taxRate: 23,  // 23% IVA
    discount: 10  // 10% discount
});
```

### Save Invoice to JSON / Guardar Fatura em JSON

```javascript
const filename = generator.saveInvoiceJSON(invoice, 'invoice_1000.json');
console.log(`Invoice saved to: ${filename}`);
```

## Running the Demo / Executar a Demonstração

```bash
npm run demo
```

## Running Tests / Executar Testes

```bash
npm test
```

## API Reference / Referência da API

### `generateInvoice(customerInfo, items, options)`

Generates a new invoice.

**Parameters:**
- `customerInfo` (Object): Customer details
  - `name` (string): Customer name
  - `email` (string): Customer email
  - `address` (string): Customer address
  - `taxId` (string): Tax ID / NIF
- `items` (Array): Array of items
  - `description` (string): Item description
  - `quantity` (number): Quantity
  - `price` (number): Unit price
- `options` (Object): Optional settings
  - `taxRate` (number): Tax rate percentage (e.g., 23 for 23%)
  - `discount` (number): Discount percentage (e.g., 10 for 10%)

**Returns:** Invoice object

### `formatInvoice(invoice)`

Formats an invoice for display.

**Parameters:**
- `invoice` (Object): Invoice object

**Returns:** Formatted string

### `saveInvoiceJSON(invoice, filename)`

Saves an invoice to a JSON file.

**Parameters:**
- `invoice` (Object): Invoice object
- `filename` (string): Filename to save to

**Returns:** Filename

## License

ISC
