import React, { useState } from 'react';
import { ShieldCheck, User, CreditCard, Camera, CheckCircle2, AlertCircle } from 'lucide-react';
import { CandidateIdentity } from '../types';

interface IdentityCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateIdentity: CandidateIdentity;
  onSaveIdentity: (identity: CandidateIdentity) => void;
  onStartFullTest: () => void;
}

export const IdentityCheckModal: React.FC<IdentityCheckModalProps> = ({
  isOpen,
  onClose,
  candidateIdentity,
  onSaveIdentity,
  onStartFullTest
}) => {
  const [fullName, setFullName] = useState(candidateIdentity.fullName || 'Nguyen Van A');
  const [idNumber, setIdNumber] = useState(candidateIdentity.idNumber || '001202008888');
  const [photoPreview, setPhotoPreview] = useState<string | null>(candidateIdentity.idPhotoUrl || null);
  const [isCapturing, setIsCapturing] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: CandidateIdentity = {
      fullName: fullName.trim() || 'Thí sinh IELTS',
      idNumber: idNumber.trim() || '000000000000',
      idPhotoUrl: photoPreview || undefined,
      verified: true
    };
    onSaveIdentity(updated);
    onStartFullTest();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border-2 border-red-600 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl border border-white/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-red-200">IELTS Step 1</span>
              <h2 className="text-xl font-bold tracking-tight">Greeting & Identity Card Check</h2>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 leading-relaxed">
            <p className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-red-600" /> Quy trình kiểm tra ID Card trước khi thi Full Part:
            </p>
            Theo quy định thi IELTS thật, Giám khảo sẽ chào hỏi, kiểm tra tên đầy đủ và Thẻ Căn Cước/Passport của bạn trước khi ghi âm bài nói Part 1, 2, 3.
          </div>

          {/* Candidate Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <User className="w-4 h-4 text-red-600" /> Họ và Tên Thí Sinh (Full Name) *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ví dụ: NGUYEN VAN A"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 font-medium text-slate-800"
            />
          </div>

          {/* ID / Passport Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-blue-600" /> Số CCCD / Passport (Identity Number) *
            </label>
            <input
              type="text"
              required
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="Ví dụ: 001202001234"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-slate-800"
            />
          </div>

          {/* ID Card Image Upload */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-emerald-600" /> Ảnh Thẻ Căn Cước / Passport (Tùy chọn)
            </label>
            <div className="flex items-center gap-4">
              {photoPreview ? (
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-emerald-500 group shadow-sm">
                  <img src={photoPreview} alt="ID Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setPhotoPreview(null)}
                    className="absolute inset-0 bg-black/60 text-white text-xs font-bold opacity-0 group-hover:opacity-100 flex items-center justify-center transition"
                  >
                    Xóa ảnh
                  </button>
                </div>
              ) : (
                <label className="w-full border-2 border-dashed border-slate-300 hover:border-red-500 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-50/50 hover:bg-slate-100/50 transition">
                  <Camera className="w-8 h-8 text-slate-400 mb-1" />
                  <span className="text-xs font-semibold text-slate-600">Tải ảnh CCCD hoặc chụp hình</span>
                  <span className="text-[10px] text-slate-400">PNG, JPG dưới 5MB</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-medium text-xs transition"
            >
              Hủy
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Xác Nhận ID & Bắt Đầu Full Test</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
