import { Dropdown as AntDDropdown } from "antd";
import { Menu as AntDMenu } from "antd";
const Item = AntDMenu.Item;

export type ItemType = React.ComponentProps<typeof Item> & {
  key: string;
};

type DropdownPropsType = React.ComponentProps<typeof AntDDropdown> & {
  items: ItemType[];
};

const renderMenu = (items: ItemType[]) => {
  return (
    <AntDMenu>
      {items.map(({ children, key, onClick }) => (
        <Item key={key} onClick={onClick}>
          {children}
        </Item>
      ))}
    </AntDMenu>
  );
};

const Dropdown = ({ children, items, ...props }: DropdownPropsType) => {
  return (
    <AntDDropdown {...props} overlay={renderMenu(items)}>
      {children}
    </AntDDropdown>
  );
};

export default Dropdown;
