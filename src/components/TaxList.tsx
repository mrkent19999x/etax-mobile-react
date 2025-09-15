import React, { useState } from 'react';
import { mockData, formatCurrency, formatDate, getTaxByStatus, type TaxInfo } from '../data/mockData';

interface TaxListProps {
  className?: string;
}

const TaxList: React.FC<TaxListProps> = ({ className = '' }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [taxes] = useState<TaxInfo[]>(mockData.taxInfo);

  const filteredTaxes = selectedStatus === 'all' 
    ? taxes 
    : taxes.filter(tax => tax.status === selectedStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ nộp';
      case 'paid': return 'Đã nộp';
      case 'overdue': return 'Quá hạn';
      case 'processing': return 'Đang xử lý';
      default: return 'Không xác định';
    }
  };

  return (
    <div className={`bg-white rounded-ios-lg shadow-ios mx-md p-lg ${className}`}>
      {/* Filter Tabs */}
      <div className="flex gap-xs mb-lg">
        {[
          { key: 'all', label: 'Tất cả', count: taxes.length },
          { key: 'pending', label: 'Chờ nộp', count: getTaxByStatus('pending').length },
          { key: 'overdue', label: 'Quá hạn', count: getTaxByStatus('overdue').length },
          { key: 'paid', label: 'Đã nộp', count: getTaxByStatus('paid').length },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setSelectedStatus(tab.key)}
            className={`px-md py-xs rounded-ios text-sm font-medium transition-colors ${
              selectedStatus === tab.key
                ? 'bg-etax-red text-white'
                : 'bg-etax-light text-gray-600 hover:bg-etax-border'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Tax List */}
      <div className="space-y-md">
        {filteredTaxes.map(tax => (
          <div
            key={tax.id}
            className="border border-etax-border rounded-ios p-md hover:shadow-ios transition-shadow"
          >
            <div className="flex justify-between items-start mb-sm">
              <div className="flex-1">
                <h4 className="font-semibold text-etax-dark font-ios mb-xs">
                  {tax.type}
                </h4>
                <p className="text-sm text-gray-600 font-ios mb-xs">
                  {tax.description}
                </p>
                <div className="flex items-center gap-md text-xs text-gray-500 font-ios">
                  <span>Hạn nộp: {formatDate(tax.dueDate)}</span>
                  <span>•</span>
                  <span>{tax.history.length} hoạt động</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-etax-dark font-ios mb-xs">
                  {formatCurrency(tax.amount)}
                </div>
                <span className={`px-sm py-xs rounded-full text-xs font-medium ${getStatusColor(tax.status)}`}>
                  {getStatusText(tax.status)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-sm mt-md">
              {tax.status === 'pending' && (
                <button className="flex-1 bg-etax-red text-white py-sm px-md rounded-ios text-sm font-medium hover:bg-red-700 transition-colors">
                  Nộp thuế
                </button>
              )}
              {tax.status === 'overdue' && (
                <button className="flex-1 bg-etax-warning text-white py-sm px-md rounded-ios text-sm font-medium hover:bg-orange-600 transition-colors">
                  Nộp ngay
                </button>
              )}
              <button className="flex-1 bg-etax-light text-etax-dark py-sm px-md rounded-ios text-sm font-medium hover:bg-etax-border transition-colors">
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTaxes.length === 0 && (
        <div className="text-center py-xl">
          <div className="text-4xl mb-md">📋</div>
          <h3 className="text-lg font-semibold text-etax-dark mb-xs font-ios">
            Không có tờ khai thuế
          </h3>
          <p className="text-gray-600 font-ios">
            {selectedStatus === 'all' 
              ? 'Bạn chưa có tờ khai thuế nào'
              : `Không có tờ khai thuế ${getStatusText(selectedStatus)}`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default TaxList;