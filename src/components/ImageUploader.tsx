import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { getPresignedUrl, putPresignedUrl } from '../lib/api/image';
import { ReactComponent as IcPlus } from '../assets/icon/IcPlus.svg';

interface containerSize {
  setValue: any;
  watch: any;
  target: string;
  width: number;
  height: number;
}

const baseURL = import.meta.env.VITE_IMAGE_URL;

const ImageUploader = (props: containerSize) => {
  const { setValue, width, height, target, watch } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectorRef = useRef<HTMLDivElement>(null);

  // watch를 사용하여 특정 필드의 값을 추적
  const watchedValue = watch(target);

  // 이미지
  const [previewImage, setPreviewImage] = useState<string>(watchedValue);

  useEffect(() => {
    if (watchedValue) {
      // 이미지를 불러오거나 새로고침 할때
      setPreviewImage(`${baseURL}${watchedValue}`);
    }
  }, [watchedValue]);

  const [isOpenSelector, setIsOpenSelector] = useState(false);

  // 파일 확장자 알아내기
  const getFileExtension = (filename: string) => {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
  };

  const handleChange = () => {
    const inputEl = inputRef.current;
    if (!inputEl) return;
    inputEl.value = '';
    inputEl.onchange = async () => {
      const files = inputEl.files;

      if (files == null || files.length === 0) return;

      const file = files[0];

      // 파일 확장자가 jpg면 return
      const fileExtension = getFileExtension(file.name);
      if (fileExtension === 'jpg') {
        window.alert('jpg 확장자 파일은 업로드할 수 없습니다.');
        return;
      }

      try {
        const res = await getPresignedUrl(file.name);
        const { preSignedUrl, fileName } = res.data;
        if (!preSignedUrl) {
          throw new Error('presigned-url을 받아오는데 실패하였습니다.');
        }

        await putPresignedUrl(file, decodeURIComponent(preSignedUrl));

        // 기존의 fileName 형식: work/.. 형태
        const formatFileName = fileName.substring(fileName.indexOf('/') + 1);

        const s3Url = `${baseURL}${formatFileName}`;
        // 이미지를 띄울때는 baseURL을 포함한 경로로 띄우기
        setPreviewImage(s3Url);
        // 폼에 이미지를 저장할때는 baseURL을 제외하고 올리기
        setValue(target, formatFileName);
      } catch (e) {
        console.error(e);
      }
    };
    inputEl.click();
  };

  const handleClick = () => {
    handleChange();
  };

  const openSelector = () => {
    setIsOpenSelector(true);
  };
  const closeSelector = () => {
    setIsOpenSelector(false);
  };

  useEffect(() => {
    closeSelector();
  }, [previewImage]);

  useEffect(() => {
    const handleClickSelectorOutside = (e: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(e.target as Node)) {
        closeSelector();
      }
    };
    if (isOpenSelector) {
      handleChange();
      document.addEventListener('mousedown', handleClickSelectorOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickSelectorOutside);
    };
  }, [selectorRef, isOpenSelector]);

  return (
    <St.StyledWrapper>
      <St.Container width={width} height={height} onClick={handleClick}>
        <St.StyledInput type="file" accept="image/*" ref={inputRef} />
        {!watchedValue ? <IcPlus /> : <St.StyledPreview src={previewImage} alt="preview-image" />}
      </St.Container>
    </St.StyledWrapper>
  );
};

export default ImageUploader;

const St = {
  StyledWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,

  Container: styled.div<{ width?: number; height?: number }>`
    display: flex;
    position: relative;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.colors.Gam_White};
    cursor: pointer;
    width: ${({ width }) => `${width}rem`};
    height: ${({ height }) => `${height}rem`};
  `,

  StyledInput: styled.input`
    width: 3.2rem;
    height: 3.2rem;
    display: none;
  `,

  StyledPreview: styled.img`
    border-radius: 6px;
    width: inherit;
    height: inherit;
    object-fit: cover;
  `,

  StyledSelectorControlButton: styled.button`
    display: flex;
    position: absolute;
    right: 12px;
    bottom: 12px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: black;
    cursor: pointer;
    width: 22px;
    height: 22px;
  `,
};
