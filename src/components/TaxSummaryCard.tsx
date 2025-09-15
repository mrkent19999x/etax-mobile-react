import React from 'react';
import { mockData, formatCurrency, getTaxByStatus } from '../data/mockData';

interface TaxSummaryCardProps {
  className?: string;
}

const TaxSummaryCard: React.FC<TaxSummaryCardProps> = ({ className = '' }) => {
  const pendingTaxes = getTaxByStatus('pending');
  const overdueTaxes = getTaxByStatus('overdue');
  const totalPending = pendingTaxes.reduce((sum, tax) => sum + tax.amount, 0);
  const totalOverdue = overdueTaxes.reduce((sum, tax) => sum + tax.amount, 0);

  return (
    <div className={`bg-white rounded-ios-lg shadow-ios mx-md p-lg ${className}`}>
      <div className="flex justify-between items-center mb-md">
        <h3 className="text-lg font-semibold text-etax-dark font-ios">Tổng quan thuế</h3>
        <span className="text-xs text-gray-500 font-ios">Cập nhật: {new Date().toLocaleTimeString('vi-VN')}</span>
      </div>
      
      <div className="grid grid-cols-1 xs:grid-cols-3 gap-sm">
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-ios p-md flex items-center gap-sm">
          <div className="text-2xl">⏳</div>
          <div className="flex-1">
            <div className="text-xs text-gray-600 mb-xs font-ios">Chờ nộp</div>
            <div className="text-sm font-bold text-etax-dark mb-xs font-ios">{formatCurrency(totalPending)}</div>
            <div className="text-xs text-gray-500 font-ios">{pendingTaxes.length} tờ khai</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-ios p-md flex items-center gap-sm">
          <div className="text-2xl">⚠️</div>
          <div className="flex-1">
            <div className="text-xs text-gray-600 mb-xs font-ios">Quá hạn</div>
            <div className="text-sm font-bold text-etax-dark mb-xs font-ios">{formatCurrency(totalOverdue)}</div>
            <div className="text-xs text-gray-500 font-ios">{overdueTaxes.length} tờ khai</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-ios p-md flex items-center gap-sm">
          <div className="text-2xl">📊</div>
          <div className="flex-1">
            <div className="text-xs text-gray-600 mb-xs font-ios">Tổng cộng</div>
            <div className="text-sm font-bold text-etax-dark mb-xs font-ios">{formatCurrency(totalPending + totalOverdue)}</div>
            <div className="text-xs text-gray-500 font-ios">{mockData.taxInfo.length} tờ khai</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxSummaryCard;