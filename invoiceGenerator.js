/**
 * Invoice Generator Module
 * Módulo Gerador de Faturas
 */

class InvoiceGenerator {
    constructor() {
        this.invoiceNumber = 1000;
    }

    /**
     * Generate a new invoice
     * @param {Object} customerInfo - Customer information
     * @param {Array} items - Array of items with description, quantity, and price
     * @param {Object} options - Additional options like taxes, discount
     * @returns {Object} Generated invoice
     */
    generateInvoice(customerInfo, items, options = {}) {
        const invoice = {
            invoiceNumber: this.invoiceNumber++,
            date: new Date().toISOString().split('T')[0],
            customer: {
                name: customerInfo.name || 'N/A',
                email: customerInfo.email || 'N/A',
                address: customerInfo.address || 'N/A',
                taxId: customerInfo.taxId || 'N/A'
            },
            items: [],
            subtotal: 0,
            tax: options.taxRate || 0,
            discount: options.discount || 0,
            total: 0
        };

        // Process items
        items.forEach(item => {
            const itemTotal = item.quantity * item.price;
            invoice.items.push({
                description: item.description,
                quantity: item.quantity,
                price: item.price,
                total: itemTotal
            });
            invoice.subtotal += itemTotal;
        });

        // Calculate totals
        const taxAmount = invoice.subtotal * (invoice.tax / 100);
        const discountAmount = invoice.subtotal * (invoice.discount / 100);
        invoice.total = invoice.subtotal + taxAmount - discountAmount;

        return invoice;
    }

    /**
     * Format invoice for display
     * @param {Object} invoice - Invoice object
     * @returns {string} Formatted invoice
     */
    formatInvoice(invoice) {
        let output = '\n';
        output += '='.repeat(60) + '\n';
        output += '                    FATURA / INVOICE\n';
        output += '='.repeat(60) + '\n';
        output += `Número da Fatura: ${invoice.invoiceNumber}\n`;
        output += `Data: ${invoice.date}\n`;
        output += '-'.repeat(60) + '\n';
        output += 'CLIENTE / CUSTOMER:\n';
        output += `  Nome: ${invoice.customer.name}\n`;
        output += `  Email: ${invoice.customer.email}\n`;
        output += `  Endereço: ${invoice.customer.address}\n`;
        output += `  NIF/Tax ID: ${invoice.customer.taxId}\n`;
        output += '-'.repeat(60) + '\n';
        output += 'ITENS / ITEMS:\n';
        output += '-'.repeat(60) + '\n';
        
        invoice.items.forEach((item, index) => {
            output += `${index + 1}. ${item.description}\n`;
            output += `   Quantidade: ${item.quantity} x €${item.price.toFixed(2)} = €${item.total.toFixed(2)}\n`;
        });
        
        output += '-'.repeat(60) + '\n';
        output += `Subtotal:                                    €${invoice.subtotal.toFixed(2)}\n`;
        
        if (invoice.tax > 0) {
            const taxAmount = invoice.subtotal * (invoice.tax / 100);
            output += `Imposto (${invoice.tax}%):                                €${taxAmount.toFixed(2)}\n`;
        }
        
        if (invoice.discount > 0) {
            const discountAmount = invoice.subtotal * (invoice.discount / 100);
            output += `Desconto (${invoice.discount}%):                            -€${discountAmount.toFixed(2)}\n`;
        }
        
        output += '='.repeat(60) + '\n';
        output += `TOTAL:                                       €${invoice.total.toFixed(2)}\n`;
        output += '='.repeat(60) + '\n';
        
        return output;
    }

    /**
     * Save invoice to JSON file
     * @param {Object} invoice - Invoice object
     * @param {string} filename - Filename to save
     */
    saveInvoiceJSON(invoice, filename) {
        const fs = require('fs');
        fs.writeFileSync(filename, JSON.stringify(invoice, null, 2));
        return filename;
    }
}

module.exports = InvoiceGenerator;
