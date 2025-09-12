export interface DemoToken {
  id: string;
  token: string;
  user: string;
  created: string;
  expires: string;
  status: 'active' | 'expired';
}

export class TokenManager {
  private static instance: TokenManager;
  private tokens: DemoToken[] = [];

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  constructor() {
    this.loadTokens();
  }

  private loadTokens(): void {
    const saved = localStorage.getItem('demo_tokens');
    if (saved) {
      this.tokens = JSON.parse(saved);
    }
  }

  private saveTokens(): void {
    localStorage.setItem('demo_tokens', JSON.stringify(this.tokens));
  }

  generateToken(user: string): DemoToken {
    const token = `demo_${Date.now()}`;
    const created = new Date().toISOString().split('T')[0];
    const expires = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const newToken: DemoToken = {
      id: Date.now().toString(),
      token,
      user,
      created,
      expires,
      status: 'active'
    };

    this.tokens.push(newToken);
    this.saveTokens();
    return newToken;
  }

  getTokens(): DemoToken[] {
    return this.tokens;
  }

  validateToken(token: string): boolean {
    const found = this.tokens.find(t => t.token === token);
    if (!found) return false;
    
    const now = new Date();
    const expires = new Date(found.expires);
    
    if (now > expires) {
      found.status = 'expired';
      this.saveTokens();
      return false;
    }
    
    return true;
  }

  revokeToken(token: string): void {
    const index = this.tokens.findIndex(t => t.token === token);
    if (index > -1) {
      this.tokens[index].status = 'expired';
      this.saveTokens();
    }
  }

  getTokenInfo(token: string): DemoToken | null {
    return this.tokens.find(t => t.token === token) || null;
  }
}

export const tokenManager = TokenManager.getInstance();
