
import {
  calculateInvoice,
  buildOrderPackages,
  produceRestockingList,
} from './index'; 
import { Order, Products, Tool, Product } from './structure';

jest.mock('axios');

describe('Test calculateInvoice function', () => {
  it('should calculate invoice price correctly', () => {
    const product: Product = {
      id: '1',
      name: 'Product 1',
      productCode: 'productCode 1',
      description: 'Description 1',
      stock: 10,
      unitPrice: 5.0,
    };
    const total = 10;
    const expectedInvoicePrice = total + product.unitPrice;
    expect(calculateInvoice(product, total)).toBe(expectedInvoicePrice);
  });

});

describe('Test buildOrderPackages function', () => {
  it('should build order packages correctly', () => {
  
    const orders: Order[] = [
      {
        id: '1',
        articles: ['1', '2'],
        installationDate: '1'
      },
    ];
    const products: Product[] = [
      {
        id: '1',
        name: 'Product 1',
        productCode: 'productCode 1',
        description: 'Description 1',
        stock: 10,
        unitPrice: 5.0,
      },
      {
        id: '2',
        name: 'Product 2',
        productCode: 'productCode 2',
        description: 'Description 2',
        stock: 5,
        unitPrice: 3.0,
      },
    ];

    
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    buildOrderPackages(orders, products);

    
    expect(consoleLogSpy).toHaveBeenCalledTimes(3); 
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Package order 1'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Total Articles'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Total price 1'));

    consoleLogSpy.mockRestore();
  });

});

describe('Test produceRestockingList function', () => {
  it('should produce restocking list correctly', () => {
    const products: Product[] = [
      {
        id: '1',
        name: 'Product 1',
        productCode: 'productCode 1',
        description: 'Description 1',
        stock: 2, 
        unitPrice: 5.0,
      },
      {
        id: '2',
        name: 'Product 2',
        productCode: 'productCode 2',
        description: 'Description 2',
        stock: 5,
        unitPrice: 3.0,
      },
    ];


    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    produceRestockingList(products);

    
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Restocking List'));
  
    consoleLogSpy.mockRestore();
  });

});
