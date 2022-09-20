interface Props {
  className?: string;
  children: React.ReactNode;
}

const Card = ({ className, children }: Props) => (
  <div className={`bg-gray-50 p-4 mb-2 rounded-md shadow ${className}`}>
    {children}
  </div>
);

export default Card;
