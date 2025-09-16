import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TraCuuTNPT: React.FC = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    mst: '',
    name: '',
    year: new Date().getFullYear().toString()
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<{ found: boolean; data: { name: string; mst: string; year: string; dependents: { name: string; relationship: string; birthYear: string }[] } } | null>(null);

  useEffect(() => {
    // Check if user is logged in (support both keys)
    const loggedInUser = localStorage.getItem('etax_logged_in_user') || localStorage.getItem('isLoggedIn');
    if (!loggedInUser) {
      navigate('/');
      return;
    }
  }, [navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate('/dashboard');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSearchResult(null);

    // Simulate search
    setTimeout(() => {
      setSearchResult({
        found: true,
        data: {
          name: 'Nguyễn Văn A',
          mst: searchData.mst,
          year: searchData.year,
          dependents: [
            { name: 'Nguyễn Thị B', relationship: 'Vợ/Chồng', birthYear: '1985' },
            { name: 'Nguyễn Văn C', relationship: 'Con', birthYear: '2010' }
          ]
        }
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="phone-frame">
      <header className="header" style={{
        backgroundColor: 'etax-error',
        color: 'white',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        paddingTop: 'max(12px, env(safe-area-inset-top))'
      }}>
        <i className="fas fa-arrow-left" onClick={handleBack} style={{fontSize: 'md', cursor: 'pointer'}}></i>
        <div className="header-title" style={{fontSize: 'md', fontWeight: 500, textAlign: 'center', flex: 1}}>Tra cứu TNPT</div>
        <i className="fas fa-house" onClick={handleHome} style={{fontSize: 'md', cursor: 'pointer'}}></i>
      </header>

      <div style={{paddingTop: '100px'}}>
        <div className="content-area" style={{
          flex: 1,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          backgroundColor: 'etax-background',
          padding: 'md',
          display: 'flex',
          flexDirection: 'column',
          gap: 'md'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: 'md',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{marginBottom: 'md', fontSize: '18px', color: 'black'}}>Tra cứu thông tin người phụ thuộc</h3>

            <form onSubmit={handleSearch}>
              <div style={{marginBottom: 'md'}}>
                <label style={{display: 'block', marginBottom: 'sm', fontWeight: 500, color: 'etax-text'}}>
                  Mã số thuế:
                </label>
                <input
                  type="text"
                  name="mst"
                  value={searchData.mst}
                  onChange={handleInputChange}
                  required
                  placeholder="Nhập mã số thuế"
                  style={{
                    width: '100%',
                    padding: 'sm',
                    border: '1px solid #ddd',
                    borderRadius: 'sm',
                    fontSize: 'md'
                  }}
                />
              </div>

              <div style={{marginBottom: 'md'}}>
                <label style={{display: 'block', marginBottom: 'sm', fontWeight: 500, color: 'etax-text'}}>
                  Tên người nộp thuế:
                </label>
                <input
                  type="text"
                  name="name"
                  value={searchData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Nhập tên người nộp thuế"
                  style={{
                    width: '100%',
                    padding: 'sm',
                    border: '1px solid #ddd',
                    borderRadius: 'sm',
                    fontSize: 'md'
                  }}
                />
              </div>

              <div style={{marginBottom: 'md'}}>
                <label style={{display: 'block', marginBottom: 'sm', fontWeight: 500, color: 'etax-text'}}>
                  Năm:
                </label>
                <select
                  name="year"
                  value={searchData.year}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: 'sm',
                    border: '1px solid #ddd',
                    borderRadius: 'sm',
                    fontSize: 'md',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  backgroundColor: 'etax-error',
                  color: 'white',
                  border: 'none',
                  padding: 'sm',
                  borderRadius: 'sm',
                  fontSize: 'md',
                  fontWeight: 500,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                {isLoading ? 'Đang tìm kiếm...' : 'Tìm kiếm'}
              </button>
            </form>

            {searchResult && (
              <div style={{
                marginTop: 'md',
                backgroundColor: '#f8f9fa',
                borderRadius: '10px',
                padding: 'md',
                border: '1px solid #e9ecef'
              }}>
                <h4 style={{marginBottom: 'md', fontSize: 'md', color: 'etax-text'}}>Kết quả tìm kiếm:</h4>
                <div style={{marginBottom: 'sm'}}>
                  <strong>Tên:</strong> {searchResult.data.name}
                </div>
                <div style={{marginBottom: 'sm'}}>
                  <strong>MST:</strong> {searchResult.data.mst}
                </div>
                <div style={{marginBottom: 'md'}}>
                  <strong>Năm:</strong> {searchResult.data.year}
                </div>

                <div>
                  <strong>Người phụ thuộc:</strong>
                  {searchResult.data.dependents.map((dep: { name: string; relationship: string }, index: number) => (
                    <div key={index} style={{
                      marginTop: 'sm',
                      padding: 'sm',
                      backgroundColor: 'white',
                      borderRadius: '6px',
                      fontSize: 'body-2'
                    }}>
                      <div><strong>Tên:</strong> {dep.name}</div>
                      <div><strong>Quan hệ:</strong> {dep.relationship}</div>
                      <div><strong>Năm sinh:</strong> {dep.birthYear}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraCuuTNPT;
