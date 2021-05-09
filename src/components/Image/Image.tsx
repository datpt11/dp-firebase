import React from 'react';
import { CSSProperties, FC, useEffect, useRef, useState } from 'react';

import { Radius } from 'types/Themes';

import debounce from './debounce';
import elementInViewport from './elementInViewport';

export interface ImageProps {
  /** Src của ảnh khi đã load (load hình thích hợp nhất theo breakpoint với viewport hiện tại) */
  src: string;
  /** alt */
  alt?: string;
  /**  Ảnh chỉ được load khi nằm trong màn hình */
  lazyLoad?: boolean;
  /** Ảnh trước khi load */
  previewSrc?: string;
  /** Tỉ lệ ảnh (khi sử dụng backgroundImage) */
  aspectRatioInPercent?: number;
  /** Max width của ảnh */
  width?: number;
  /** Max height của ảnh */
  height?: number;
  /** containerClassName */
  containerClassName?: string;
  /** containerStyle */
  containerStyle?: CSSProperties;
  /** imageClassName */
  imageClassName?: string;
  /** imageStyle */
  imageStyle?: CSSProperties;
  /** radius */
  radius?: Radius;
}

const RADIUSMAPPING: Record<Radius, string> = {
  pill: 'rounded-full',
  square: '',
  rounded: 'rounded-[5px]',
};

const Image: FC<ImageProps> = ({
  src,
  aspectRatioInPercent = '56.25',
  height,
  imageClassName,
  lazyLoad = false,
  imageStyle,
  containerStyle,
  radius = 'square',
  containerClassName,
  previewSrc = 'https://travel.highspeedblog.com/wp-content/uploads/sites/11/2020/06/tv003-4x3.jpg',
  width,
}) => {
  const [imageSrc, setImageSrc] = useState(previewSrc);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const _handleScroll = () => {
    const el = imageRef.current as Element;
    const debounced = debounce(() => {
      if (elementInViewport(el)) {
        setImageSrc(src);
      }
    }, 10);
    debounced();
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    const el = imageRef.current as Element;
    if (imageRef && imageSrc === previewSrc && lazyLoad) {
      if (
        'IntersectionObserver' in window ||
        'IntersectionObserverEntry' in window ||
        'intersectionRatio' in window.IntersectionObserverEntry.prototype
      ) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.intersectionRatio > 0.5 || entry.isIntersecting) {
                setImageSrc(src);
              }
            });
          },
          {
            root: null,
            threshold: 0.5, //ti le % kha nang hien thi cua item 0.5 = 50%
          },
        );
        if (imageRef) {
          observer.observe(el);
        }
      } else {
        _handleScroll();
        window.addEventListener('scroll', _handleScroll);
      }
    } else {
      setImageSrc(src);
    }

    return () => {
      if (observer) {
        observer?.unobserve(el);
      } else {
        window.removeEventListener('scroll', _handleScroll);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewSrc, imageSrc, src, lazyLoad]);

  return (
    <div ref={imageRef} style={{ ...containerStyle }} className={`image__container block ${containerClassName}`}>
      <div className={`image__content relative h-full overflow-hidden ${RADIUSMAPPING[radius]}`} style={{ paddingTop: `${aspectRatioInPercent}%` }}>
        <div
          className="image__preview absolute top-0 left-0 w-full h-full bg-center bg-cover filter filter-blur-1 transition-colors  opacity-0"
          style={{ backgroundImage: `url(${previewSrc})` }}
        />
        <div
          className={`image__main absolute top-0 left-0 w-full h-full bg-center bg-cover ${imageClassName}`}
          style={{
            backgroundImage: `url(${imageSrc})`,
            maxHeight: `${height}px`,
            maxWidth: `${width}px`,
            ...imageStyle,
          }}
        />
      </div>
    </div>
  );
};

export default Image;
