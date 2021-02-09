import Image from 'next/image';

export default function FreepikImage({ src, author, ...props }) {
  const description = `Designed by ${author} / Freepik`;

  const { width, height, ...fowardProps } = props;
  const sizeProps = !width || !height ? { layout: 'fill' } : { width, height };

  return (
    <a target="_blank" rel="noopener noreferrer" href="http://www.freepik.com">
      <Image src={src} alt={description} {...sizeProps} {...fowardProps} />
    </a>
  );
}
