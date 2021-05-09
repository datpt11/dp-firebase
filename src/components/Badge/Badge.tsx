import React, { FC, ReactNode, useMemo } from 'react';

type StatusDot = 'success' | 'processing' | 'default' | 'error' | 'warning';

const STATUSMAPPING: Record<StatusDot, string> = {
  default: 'bg-gray-400',
  error: 'bg-red-500',
  processing: 'bg-blue-500',
  success: 'bg-tertiary',
  warning: 'bg-primary',
};

export interface BadgeProps {
  count?: ReactNode;
  showZero?: boolean;
  overflowCount?: number;
  dot?: boolean;
  style?: React.CSSProperties;
  containerClassName?: string;
  status?: StatusDot;
  color?: string;
  Icon?: ReactNode;
  offset?: [number | string, number | string];
  title?: string;
}

const Badge: FC<BadgeProps> = ({
  children,
  status,
  color,
  count = null,
  overflowCount = 99,
  dot = false,
  title,
  offset,
  style,
  Icon,
  containerClassName,
  showZero = false,
}) => {
  const styleCount: React.CSSProperties = (count as number) > 9 ? { padding: `0 6px` } : {};
  // Neu count > overflow count thi hien thi 99 +
  const numberedDisplayCount = ((count as number) > overflowCount ? `${overflowCount}+` : count) as string | number | null;
  // check status
  const hasStatus = !!status || !!color;
  // check count co bang 0
  const isZero = numberedDisplayCount === '0' || numberedDisplayCount === 0;
  // co dot hoac hasStatus va khong co count
  const showAsDot = (dot && !isZero) || hasStatus;

  const mergedCount = showAsDot ? '' : numberedDisplayCount;

  const isHidden = useMemo(() => {
    const isEmpty = mergedCount === null || mergedCount === undefined || mergedCount === '';
    return (isEmpty || (isZero && !showZero)) && !showAsDot && !Icon;
  }, [mergedCount, isZero, showZero, showAsDot, Icon]);

  if (dot) {
    return (
      <div className={`badge__container relative inline-block ${containerClassName}`}>
        {children}
        {!isHidden && (
          <>
            <sup
              style={{
                marginTop: `${offset?.[1]}px`,
                right: `${offset?.[0]}px`,
                ...style,
              }}
              className={`badge__dot absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 origin-bottom-left z-auto w-2 h-2 rounded-full shadow-sm ${
                STATUSMAPPING[status as StatusDot]
              }`}
            >
              {status === 'processing' && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              )}
            </sup>
          </>
        )}
      </div>
    );
  } else if (Icon) {
    return (
      <div className={`badge__container relative inline-block ${containerClassName}`}>
        {children}
        {!isHidden && (
          <sup
            style={{
              marginTop: `${offset?.[1]}px`,
              right: `${offset?.[0]}px`,
              ...styleCount,
              ...style,
            }}
            className="badge__icon absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 origin-bottom-left"
            title={title}
          >
            {Icon}
          </sup>
        )}
      </div>
    );
  }

  return (
    <div className={`badge__container relative inline-block ${containerClassName}`}>
      {children}
      {!isHidden && (
        <sup
          style={{
            marginTop: `${offset?.[1]}px`,
            right: `${offset?.[0]}px`,
            ...styleCount,
            ...style,
          }}
          className="badge__count absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 origin-bottom-left overflow-hidden z-auto min-w-[20px] h-5 font-normal text-xs leading-5 whitespace-nowrap text-center bg-quaternary rounded-xl shadow-sm text-white "
          title={title}
        >
          {numberedDisplayCount}
        </sup>
      )}
    </div>
  );
};
export default Badge;
