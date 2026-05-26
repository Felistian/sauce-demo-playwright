import { APIRequestContext,APIResponse} from '@playwright/test';
import { LoginRequest, LoginResponse, Product, ProductsResponse } from '../data/api/api-types';


export class DummyJsonApi {

    private request: APIRequestContext;
    private baseUrl: string = 'https://dummyjson.com';
    private token: string = '';

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    // ===== AUTH =====
    async login(credentials: LoginRequest) : Promise<APIResponse> {
        const response = await this.request.post(`${this.baseUrl}/auth/login`, {
            data: credentials
        });
        return response;
    }

   async loginAndGetToken(credentials: LoginRequest): Promise<string> {
        const response = await this.login(credentials);
        const body: LoginResponse = await response.json();
    
        // DummyJSON uses accessToken now!
        this.token = body.accessToken || body.token;  // handle both ✅
        return this.token;
    }


    async getMe(): Promise<APIResponse> {
        const response = await this.request.get(`${this.baseUrl}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
        return response;
    }

    // ===== PRODUCTS =====
    async getProducts(): Promise<APIResponse> {
        const response = await this.request.get(`${this.baseUrl}/products`);
        return response;
    }

    async getProductById(id: number): Promise<APIResponse> {
        const response = await this.request.get(`${this.baseUrl}/products/${id}`);
        return response;
    }

    async searchProducts(query: string): Promise<APIResponse> {
        const response = await this.request.get(`${this.baseUrl}/products/search`, {
            params: { q: query }
        });
        return response;
    }

    async createProduct(product: Partial<Product>): Promise<APIResponse> {
        const response = await this.request.post(`${this.baseUrl}/products/add`, {
            data: product
        });
        return response;
    }

    async updateProduct(id: number, product: Partial<Product>): Promise<APIResponse> {
        const response = await this.request.put(`${this.baseUrl}/products/${id}`, {
            data: product
        });
        return response;
    }

    async deleteProduct(id: number): Promise<APIResponse> {
        const response = await this.request.delete(`${this.baseUrl}/products/${id}`);
        return response;
    }
}