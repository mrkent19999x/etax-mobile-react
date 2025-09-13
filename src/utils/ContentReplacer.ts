// Content Replacer - Thay thế nội dung động trong các trang
export class ContentReplacer {
  private static placeholders: Record<string, string> = {};

  // Load placeholders từ demo data
  static loadPlaceholders(content: Record<string, string>) {
    this.placeholders = { ...content };
  }

  // Thay thế nội dung trong text
  static replaceContent(text: string): string {
    if (!text || typeof text !== 'string') return text;
    
    let result = text;
    
    // Thay thế tất cả placeholders
    Object.entries(this.placeholders).forEach(([key, value]) => {
      const pattern = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(pattern, value);
    });
    
    return result;
  }

  // Thay thế nội dung trong object
  static replaceInObject(obj: any): any {
    if (typeof obj === 'string') {
      return this.replaceContent(obj);
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.replaceInObject(item));
    }
    
    if (obj && typeof obj === 'object') {
      const result: any = {};
      Object.keys(obj).forEach(key => {
        result[key] = this.replaceInObject(obj[key]);
      });
      return result;
    }
    
    return obj;
  }

  // Thay thế nội dung trong JSX props
  static replaceInJSXProps(props: any): any {
    const result: any = {};
    
    Object.keys(props).forEach(key => {
      if (key === 'children') {
        // Xử lý children đặc biệt
        if (typeof props.children === 'string') {
          result.children = this.replaceContent(props.children);
        } else if (Array.isArray(props.children)) {
          result.children = props.children.map((child: any) => {
            if (typeof child === 'string') {
              return this.replaceContent(child);
            }
            return child;
          });
        } else {
          result.children = props.children;
        }
      } else if (typeof props[key] === 'string') {
        result[key] = this.replaceContent(props[key]);
      } else {
        result[key] = props[key];
      }
    });
    
    return result;
  }

  // Lấy danh sách tất cả placeholders
  static getAllPlaceholders(): string[] {
    return Object.keys(this.placeholders);
  }

  // Lấy giá trị placeholder
  static getPlaceholder(key: string): string {
    return this.placeholders[key] || '';
  }

  // Set giá trị placeholder
  static setPlaceholder(key: string, value: string) {
    this.placeholders[key] = value;
  }

  // Clear tất cả placeholders
  static clearPlaceholders() {
    this.placeholders = {};
  }
}