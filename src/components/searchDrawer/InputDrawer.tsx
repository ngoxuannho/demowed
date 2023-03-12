import { Drawer, Form, Input, List, Avatar, message } from "antd";
import {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  useLayoutEffect,
} from "react";
import { SearchOutlined } from "@ant-design/icons";
import { iDrawer } from "../cartDrawer/CartDrawer";
import { useGetProductsQuery } from "../../slices/sneakersApi";
import { Link } from "react-router-dom";
import { useNavigate, createSearchParams } from "react-router-dom";
import { search } from "../../utils/search";

export default ({ onClose, visible }: iDrawer) => {
  const { data } = useGetProductsQuery();
  const [value, setValue] = useState<string>();
  const navigate = useNavigate();
  const inputRef = useRef<any>(null);
  const results = data?.results;
  const [searchResults, setSearchResults] = useState<[]>();
  inputRef && inputRef.current?.focus();
  useLayoutEffect(() => {
    inputRef && inputRef.current?.focus();
  }, [visible]);
  useEffect(() => {
    setSearchResults(results?.filter(search(value)));
  }, [value]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const closeSearch = () => {
    onClose();
    setValue("");
  };
  const handleEnter = () => {
    if (searchResults && searchResults.length > 0) {
      message.success(`${searchResults.length} products found`);
      closeSearch();
      navigate({
        pathname: "/shop",
        search: `${createSearchParams({ search: `${value}` })}`,
      });
      return;
    }
    message.error("No product match");
    onClose();
  };
  return (
    <Drawer
      title="Tìm Kiếm Sản Phẩm Bạn Cần..."
      headerStyle={{ fontSize: "16px", fontWeight: 500 }}
      autoFocus={true}
      placement="top"
      height={
        searchResults == undefined || searchResults.length == 0
          ? 150
          : searchResults.length < 3
          ? 250
          : undefined
      }
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form>
        <Input
          allowClear={true}
          onPressEnter={handleEnter}
          onChange={(e) => handleChange(e)}
          value={value}
          ref={inputRef}
          bordered={false}
          prefix={<SearchOutlined />}
          placeholder="Nike ..."
          aria-placeholder="Adidas" 
        />
      </Form>
      {searchResults && (
        <List
          size="large"
          itemLayout="horizontal"
          dataSource={searchResults}
          renderItem={(item: any) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.media.thumbUrl} />}
                title={<Link onClick={closeSearch} to={`shop/${item.id}`}>{item.title}</Link>}
                description={`$ ${item.retailPrice}`}
              />
            </List.Item>
          )}
        />
      )}
    </Drawer>
  );
};
