/**
 * Simple tests for Invoice Generator
 * Testes simples para o Gerador de Faturas
 */

const InvoiceGenerator = require('./invoiceGenerator');

function test(description, fn) {
    try {
        fn();
        console.log('✅ PASS:', description);
        return true;
    } catch (error) {
        console.error('❌ FAIL:', description);
        console.error('  Error:', error.message);
        return false;
    }
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}

function assertDeepEqual(actual, expected, message) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(message || `Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
    }
}

// Run tests
console.log('Running Invoice Generator Tests...\n');

let passed = 0;
let failed = 0;

// Test 1: Invoice number increments
if (test('Invoice number should increment', () => {
    const generator = new InvoiceGenerator();
    const invoice1 = generator.generateInvoice({ name: 'Test' }, [{ description: 'Item', quantity: 1, price: 10 }]);
    const invoice2 = generator.generateInvoice({ name: 'Test' }, [{ description: 'Item', quantity: 1, price: 10 }]);
    assert(invoice2.invoiceNumber === invoice1.invoiceNumber + 1, 'Invoice numbers should increment');
})) passed++; else failed++;

// Test 2: Subtotal calculation
if (test('Subtotal should be calculated correctly', () => {
    const generator = new InvoiceGenerator();
    const items = [
        { description: 'Item 1', quantity: 2, price: 50 },
        { description: 'Item 2', quantity: 3, price: 30 }
    ];
    const invoice = generator.generateInvoice({ name: 'Test' }, items);
    assert(invoice.subtotal === 190, `Expected 190 but got ${invoice.subtotal}`);
})) passed++; else failed++;

// Test 3: Tax calculation
if (test('Tax should be calculated correctly', () => {
    const generator = new InvoiceGenerator();
    const items = [{ description: 'Item', quantity: 1, price: 100 }];
    const invoice = generator.generateInvoice({ name: 'Test' }, items, { taxRate: 23 });
    assert(invoice.total === 123, `Expected 123 but got ${invoice.total}`);
})) passed++; else failed++;

// Test 4: Discount calculation
if (test('Discount should be calculated correctly', () => {
    const generator = new InvoiceGenerator();
    const items = [{ description: 'Item', quantity: 1, price: 100 }];
    const invoice = generator.generateInvoice({ name: 'Test' }, items, { discount: 10 });
    assert(invoice.total === 90, `Expected 90 but got ${invoice.total}`);
})) passed++; else failed++;

// Test 5: Tax and discount together
if (test('Tax and discount should work together', () => {
    const generator = new InvoiceGenerator();
    const items = [{ description: 'Item', quantity: 1, price: 100 }];
    const invoice = generator.generateInvoice({ name: 'Test' }, items, { taxRate: 23, discount: 10 });
    // Subtotal: 100, Tax: 23, Discount: 10, Total: 100 + 23 - 10 = 113
    assert(invoice.total === 113, `Expected 113 but got ${invoice.total}`);
})) passed++; else failed++;

// Test 6: Customer information
if (test('Customer information should be stored correctly', () => {
    const generator = new InvoiceGenerator();
    const customer = {
        name: 'João Silva',
        email: 'joao@example.com',
        address: 'Lisboa',
        taxId: '123456789'
    };
    const invoice = generator.generateInvoice(customer, [{ description: 'Item', quantity: 1, price: 10 }]);
    assertDeepEqual(invoice.customer, customer, 'Customer info should match');
})) passed++; else failed++;

// Test 7: Items stored correctly
if (test('Items should be stored with totals', () => {
    const generator = new InvoiceGenerator();
    const items = [{ description: 'Test Item', quantity: 5, price: 20 }];
    const invoice = generator.generateInvoice({ name: 'Test' }, items);
    assert(invoice.items.length === 1, 'Should have one item');
    assert(invoice.items[0].total === 100, `Item total should be 100 but got ${invoice.items[0].total}`);
})) passed++; else failed++;

// Test 8: Format invoice returns string
if (test('Format invoice should return a string', () => {
    const generator = new InvoiceGenerator();
    const invoice = generator.generateInvoice({ name: 'Test' }, [{ description: 'Item', quantity: 1, price: 10 }]);
    const formatted = generator.formatInvoice(invoice);
    assert(typeof formatted === 'string', 'Formatted invoice should be a string');
    assert(formatted.includes('FATURA'), 'Should include FATURA header');
})) passed++; else failed++;

// Test 9: Date is set
if (test('Invoice should have a date', () => {
    const generator = new InvoiceGenerator();
    const invoice = generator.generateInvoice({ name: 'Test' }, [{ description: 'Item', quantity: 1, price: 10 }]);
    assert(invoice.date, 'Invoice should have a date');
    assert(invoice.date.match(/^\d{4}-\d{2}-\d{2}$/), 'Date should be in YYYY-MM-DD format');
})) passed++; else failed++;

// Test 10: Default values for missing customer info
if (test('Should handle missing customer information', () => {
    const generator = new InvoiceGenerator();
    const invoice = generator.generateInvoice({}, [{ description: 'Item', quantity: 1, price: 10 }]);
    assert(invoice.customer.name === 'N/A', 'Missing name should default to N/A');
    assert(invoice.customer.email === 'N/A', 'Missing email should default to N/A');
})) passed++; else failed++;

// Summary
console.log('\n' + '='.repeat(50));
console.log(`Tests completed: ${passed + failed}`);
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log('='.repeat(50));

// Exit with error code if any tests failed
process.exit(failed > 0 ? 1 : 0);
