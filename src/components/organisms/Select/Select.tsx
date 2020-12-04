/** @format */

import React, {
  ChangeEvent,
  FunctionComponent,
  Ref,
  createContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { compose, difference } from 'ramda';
import { withDisplayName, withLogging, withStyle } from '@project/helpers';
import { useDebounce } from '@project/hooks';
import { ClickAwayListener } from '@project/components/atoms/ClickAwayListener';
import { Flex, FlexColumn, FlexWrap } from '@project/components/atoms/Flex';
import { Label } from '@project/components/atoms/Label';
import { Menu as FixedMenu } from '@project/components/atoms/Menu';
import { When } from '@project/components/atoms/When';
import { PortalMenu } from './PortalMenu';
import { Option, OptionProps } from './Option';
import { Tag } from './Tag';
import { getLabelByValue, getOptionsBySearchTerm, toArray } from './model';
import { selectStyle, InputField, InputWrapper } from './style';

export interface SelectProps {
  className?: string;
  disabled?: boolean;
  forwardRef?: Ref<HTMLElement>;
  multiple?: boolean;
  portalNode?: HTMLElement;
  label?: string;
  name: string;
  onBlur: (x: string) => void;
  onChange: (x: string) => void;
  onKeyPress: (event: KeyboardEvent) => void;
  onServer: (x: string) => void;
  options: OptionProps[];
  readOnly?: boolean;
  value?: any;
}

export interface SelectContextProps {
  multiple?: boolean;
  selected?: string;
  onChange: (x: string) => void;
  setIsFocused: (x: boolean) => void;
  setSearchTerm: (x: string) => void;
  values: any;
}

export const Context = createContext<Partial<SelectContextProps>>({});

const Component: FunctionComponent<SelectProps> = ({
  className = '',
  disabled = false,
  label,
  multiple = false,
  onBlur,
  onChange,
  onKeyPress,
  onServer,
  options = [],
  name,
  portalNode,
  value
}: SelectProps) => {
  const myValue = value ? value : !multiple ? [] : '';
  const values = toArray(value);
  const terms = getLabelByValue(myValue)(options);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<any>(terms);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const omitOptions = multiple ? difference(options, value) : options;
  const filteredOptions = getOptionsBySearchTerm(searchTerm)(omitOptions);
  const Menu = portalNode ? PortalMenu : FixedMenu;
  const isMenuVisible =
    !disabled && isFocused && Boolean(filteredOptions.length);
  const displayValue = !multiple && terms;

  const context: SelectContextProps = {
    multiple,
    selected: searchTerm,
    onChange,
    setIsFocused,
    setSearchTerm,
    values
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    event.stopPropagation();
    setSearchTerm(event.target.value);
  }

  function handleFocus() {
    setSearchTerm('');
    setIsFocused(true);
    inputRef.current && inputRef.current.focus();
  }

  function handleBlur() {
    setSearchTerm('');
    setIsFocused(false);
    inputRef.current && inputRef.current.blur();
  }

  useEffect(() => {
    if (onServer && debouncedSearchTerm) {
      onServer(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <Context.Provider value={context}>
      <div className={className}>
        <ClickAwayListener onClickAway={handleBlur}>
          <div>
            <When condition={Boolean(label)}>
              <Label htmlFor={name}>{label}</Label>
            </When>
            <InputWrapper onClick={handleFocus}>
              <Flex spacing="0.2rem" wrap={FlexWrap.WRAP}>
                <When condition={multiple}>
                  {values.map((value: any, i: number) => (
                    <FlexColumn key={value.label}>
                      <Tag index={i}>{value.label}</Tag>
                    </FlexColumn>
                  ))}
                </When>
                <FlexColumn grow={1}>
                  <InputField
                    disabled={disabled}
                    autoComplete="off"
                    multiple={multiple}
                    name={name}
                    placeholder={displayValue}
                    onBlur={onBlur}
                    onChange={handleChange}
                    onKeyPress={onKeyPress}
                    ref={inputRef}
                    value={searchTerm}
                  />
                </FlexColumn>
              </Flex>
            </InputWrapper>
            <When condition={isMenuVisible}>
              <Menu portalNode={portalNode}>
                {filteredOptions.map((optionProps: OptionProps, i: number) => (
                  <Option key={`${optionProps.value}-${i}`} {...optionProps} />
                ))}
              </Menu>
            </When>
          </div>
        </ClickAwayListener>
      </div>
    </Context.Provider>
  );
};

export const Select = compose(
  withStyle(selectStyle, ['onChange', 'onServer', 'options']),
  withLogging(false),
  withDisplayName('Select')
)(Component);
