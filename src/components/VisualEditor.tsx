import React, { useState } from 'react';
import { Page, Navbar, Block, Button, List, ListItem } from 'konsta/react';

interface VisualEditorProps {
  onSave: (html: string, css: string) => void;
  initialHtml?: string;
  initialCss?: string;
}

const VisualEditor: React.FC<VisualEditorProps> = ({ onSave, initialHtml = '', initialCss = '' }) => {
  const [activeTab, setActiveTab] = useState('components');
  const [htmlContent, setHtmlContent] = useState(initialHtml);
  const [cssContent, setCssContent] = useState(initialCss);
  const [isPreview, setIsPreview] = useState(false);

  const components = [
    {
      id: 'etax-header',
      name: 'eTax Header',
      category: 'eTax Components',
      html: `<div style="background:linear-gradient(135deg,#d62828 0%,#b71c1c 100%);color:white;padding:20px;display:flex;justify-content:space-between;align-items:center;">
        <div style="font-size:24px;cursor:pointer;">☰</div>
        <div style="display:flex;align-items:center;gap:12px;">
          <img src="assets/logo.png" style="height:32px;">
          <span style="font-weight:700;font-size:18px;">eTax Mobile</span>
        </div>
        <div style="display:flex;gap:12px;">
          <div style="width:36px;height:36px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;">
            <i class="fas fa-qrcode" style="color:white;"></i>
          </div>
          <div style="width:36px;height:36px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;">
            <i class="fas fa-bell" style="color:white;"></i>
          </div>
        </div>
      </div>`
    },
    {
      id: 'etax-card',
      name: 'User Info Card',
      category: 'eTax Components',
      html: `<div style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:20px;margin:16px;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,0.1);">
        <div style="display:flex;align-items:center;gap:16px;">
          <div style="width:60px;height:60px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;">
            <i class="fas fa-user" style="font-size:24px;color:white;"></i>
          </div>
          <div>
            <h3 style="margin:0;font-size:18px;font-weight:600;">{{user_name}}</h3>
            <p style="margin:4px 0 0 0;opacity:0.9;">MST: {{user_mst}}</p>
            <p style="margin:4px 0 0 0;opacity:0.8;font-size:14px;">Công ty TNHH ABC</p>
          </div>
        </div>
      </div>`
    },
    {
      id: 'etax-button',
      name: 'eTax Button',
      category: 'eTax Components',
      html: `<button style="background:linear-gradient(135deg,#d62828 0%,#b71c1c 100%);color:white;border:none;padding:16px 24px;border-radius:12px;font-weight:600;font-size:16px;cursor:pointer;width:100%;margin:8px;box-shadow:0 4px 16px rgba(214,40,40,0.3);transition:all 0.3s ease;">
        <i class="fas fa-arrow-right" style="margin-right:8px;"></i>
        Thực hiện
      </button>`
    },
    {
      id: 'etax-form',
      name: 'Form Input',
      category: 'eTax Components',
      html: `<div style="padding:16px;margin:8px;">
        <label style="display:block;margin-bottom:8px;font-weight:600;color:#333;">Nhập thông tin</label>
        <input type="text" placeholder="Nhập dữ liệu..." style="width:100%;padding:16px;border:2px solid #e2e8f0;border-radius:12px;font-size:16px;transition:border-color 0.3s ease;">
        <div style="margin-top:8px;font-size:14px;color:#64748b;">Thông tin bổ sung</div>
      </div>`
    },
    {
      id: 'etax-list',
      name: 'List Item',
      category: 'eTax Components',
      html: `<div style="background:white;border-radius:12px;margin:8px 16px;box-shadow:0 2px 12px rgba(0,0,0,0.08);overflow:hidden;">
        <div style="padding:16px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:between;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:40px;height:40px;background:#3b82f6;border-radius:50%;display:flex;align-items:center;justify-content:center;">
              <i class="fas fa-file-alt" style="color:white;font-size:16px;"></i>
            </div>
            <div>
              <div style="font-weight:600;color:#1e293b;">Khai thuế TNCN</div>
              <div style="font-size:14px;color:#64748b;">Hạn nộp: {{deadline}}</div>
            </div>
          </div>
          <div style="padding:6px 12px;background:#10b981;color:white;border-radius:20px;font-size:12px;font-weight:600;">
            Hoàn thành
          </div>
        </div>
      </div>`
    }
  ];

  const addComponent = (component: { html: string }) => {
    setHtmlContent(prev => prev + component.html);
  };

  const handleSave = () => {
    onSave(htmlContent, cssContent);
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  return (
    <Page>
      <Navbar
        title="Visual Editor"
        right={
          <div className="flex gap-2">
            <Button onClick={togglePreview} className="bg-blue-500">
              {isPreview ? 'Edit' : 'Preview'}
            </Button>
            <Button onClick={handleSave} className="bg-green-500">
              Save
            </Button>
          </div>
        }
      />

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-gray-100 border-r">
          <div className="flex gap-2 p-2 bg-gray-100">
            <Button
              className={activeTab === 'components' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}
              onClick={() => setActiveTab('components')}
            >
              Components
            </Button>
            <Button
              className={activeTab === 'styles' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}
              onClick={() => setActiveTab('styles')}
            >
              Styles
            </Button>
          </div>

          <Block>
            {activeTab === 'components' && (
              <List>
                {components.map((component) => (
                  <ListItem
                    key={component.id}
                    title={component.name}
                    subtitle={component.category}
                    onClick={() => addComponent(component)}
                    className="cursor-pointer hover:bg-gray-200"
                  />
                ))}
              </List>
            )}

            {activeTab === 'styles' && (
              <div>
                <textarea
                  value={cssContent}
                  onChange={(e) => setCssContent(e.target.value)}
                  placeholder="Nhập CSS..."
                  className="w-full h-64 p-2 border rounded"
                />
              </div>
            )}
          </Block>
        </div>

        {/* Main Editor */}
        <div className="flex-1 flex flex-col">
          {isPreview ? (
            <div className="flex-1 p-4">
              <div
                className="w-full h-full border rounded"
                dangerouslySetInnerHTML={{
                  __html: `<style>${cssContent}</style>${htmlContent}`
                }}
              />
            </div>
          ) : (
            <div className="flex-1 p-4">
              <textarea
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                placeholder="Nhập HTML hoặc kéo thả components..."
                className="w-full h-full p-2 border rounded font-mono text-sm"
              />
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

export default VisualEditor;
