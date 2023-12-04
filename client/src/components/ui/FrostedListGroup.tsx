
interface GenericListComponentProps<T> {
  items: T[];
  getKey: (item: T) => string | number;
  renderItem: (item: T) => JSX.Element;
}

export const FrostedListGroup = <T,>({ items, getKey, renderItem }: GenericListComponentProps<T>) => {
  return (
    <div className="list-group rounded-5">
      {items.map((item) => (
        <div key={getKey(item)} className="list-group-item bg-transparent frosted-glass">
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
};

