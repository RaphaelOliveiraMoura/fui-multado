export default function FreepikImage({ src, author, url, link, ...props }) {
  const description = `Designed by ${author} / Freepik`;
  const href = `http://www.freepik.com/${link}`;

  const { width, height, ...fowardProps } = props;
  const sizeProps = !width || !height ? { layout: 'fill' } : { width, height };

  return (
    <a target="_blank" rel="noopener noreferrer" href={href}>
      <img src={src} alt={description} {...sizeProps} {...fowardProps} />
    </a>
  );
}
