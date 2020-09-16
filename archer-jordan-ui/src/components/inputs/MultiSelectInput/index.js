import React from 'react';
import Select from '../SelectInput';
import DropdownStyleWrapper from '../DropdownStyleWrapper';

const {Option} = Select;

export default ({value, options, onChange}) => (
  <DropdownStyleWrapper>
    <Select style={{width: '100%'}} value={value} onChange={onChange}>
      {options.map((option) => {
        return <Option value={option.id}>{option.label}</Option>;
      })}
    </Select>
  </DropdownStyleWrapper>
);

// class MultiSelectInput extends React.PureComponent {
//   render() {
//     return (
//       <DropdownStyleWrapper>
//         <Select
//           value={this.props.value}
//           style={{width: '100%'}}
//           onChange={this.props.onChange}
//         >
//           {options.map((option) => {
//             return <Option value={option.id}>{option.label}</Option>;
//           })}
//           {/* <Option value="llc">LLC</Option>
//           <Option value="llp">LLP</Option>
//           <Option value="cCorp">C-Corp</Option>
//           <Option value="sCorp">S-Corp</Option>
//           <Option value="other">Other</Option> */}
//         </Select>
//       </DropdownStyleWrapper>
//     );
//   }
// }

// export default MultiSelectInput;
