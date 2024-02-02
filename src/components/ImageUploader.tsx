import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { getPresignedUrl, putPresignedUrl } from '../lib/api/image';
import { ReactComponent as IcPlus } from '../assets/icon/IcPlus.svg';

interface containerSize {
  setValue: any;
  width: number;
  height: number;
  target: string;
  defaultValue: string;
}

const ImageUploader = (props: containerSize) => {
  const { setValue, width, height, target, defaultValue } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectorRef = useRef<HTMLDivElement>(null);

  // 이미지
  const [previewImage, setPreviewImage] = useState<string | undefined>(defaultValue);

  const [isOpenSelector, setIsOpenSelector] = useState(false);

  const handleChange = () => {
    const inputEl = inputRef.current;
    if (!inputEl) return;
    inputEl.value = '';
    inputEl.onchange = async () => {
      const files = inputEl.files;
      if (files == null || files.length === 0) return;
      const file = files[0];
      try {
        const res = await getPresignedUrl(file.name);
        const { preSignedUrl, fileName } = res.data;
        if (!preSignedUrl) {
          throw new Error('presigned-url을 받아오는데 실패하였습니다.');
        }

        await putPresignedUrl(file, decodeURIComponent(preSignedUrl));

        const s3Url = `https://gam-image-test.s3.ap-northeast-2.amazonaws.com/${fileName}`;
        setPreviewImage(s3Url);
        setValue(target, s3Url);
      } catch (error) {
        console.error(error);
      }
    };
    inputEl.click();
  };

  const handleClick = () => {
    handleChange();
    // if (previewImage?.length) {
    //   console.log(isOpenSelector);
    //   openSelector();
    // } else {
    //   handleChange();
    // }
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
        {!previewImage ? <IcPlus /> : <St.StyledPreview src={previewImage} alt="preview-image" />}
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
