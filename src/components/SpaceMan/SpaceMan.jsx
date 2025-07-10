export default function HideOnScrollSpaceMan({ position, scale }) {
  const scroll = useScroll();
  const [visible, setVisible] = useState(true);

  useFrame(() => {
    // `scroll.offset` goes from 0 to 1 across all pages
    // Assume you want it to disappear after 1.5 pages (i.e. halfway through the third section)
    if (scroll.offset > 1.5 && visible) {
      setVisible(false);
    } else if (scroll.offset <= 1.5 && !visible) {
      setVisible(true);
    }
  });

  return visible ? <SpaceMan position={position} scale={scale} /> : null;
}
