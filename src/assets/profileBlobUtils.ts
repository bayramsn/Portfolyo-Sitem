// Bu dosya profil fotoğrafını blob olarak tutup URL oluşturmak için kullanılır

// Profil fotoğrafı için base64 kodlu veri (daha önce eklenmiş olan)
import { profilePhotoBase64 } from './profilePhoto';

// Base64'ten Blob oluştur
export const createBlobURLFromBase64 = () => {
  // Base64 veriyi binary'e çevir
  const byteCharacters = atob(profilePhotoBase64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);
    
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  
  // Blob oluştur
  const blob = new Blob(byteArrays, { type: 'image/png' });
  
  // URL oluştur
  return URL.createObjectURL(blob);
};

// React component için hook
export const useBlobProfileImage = () => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  
  useEffect(() => {
    // Component mount edildiğinde blob URL oluştur
    const url = createBlobURLFromBase64();
    setBlobUrl(url);
    
    // Component unmount edildiğinde URL'yi revoke et
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, []);
  
  return blobUrl;
};

import { useState, useEffect } from 'react';
