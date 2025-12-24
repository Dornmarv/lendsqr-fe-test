import Image from 'next/image';

export default function Icon({ src, alt, width = 16, height = 16 }: { src: string; alt: string; width?: number; height?: number }) {
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            style={{ width, height }}
        />
    );
}