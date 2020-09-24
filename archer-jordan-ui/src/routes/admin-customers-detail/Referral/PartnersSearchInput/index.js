import React, {useState, useEffect} from 'react';
import Select from 'components/inputs/SelectInput';
import DropdownStyleWrapper from 'components/inputs/DropdownStyleWrapper';
import {useQuery} from 'react-apollo';
import REFERRAL_PARTNERS from 'ApolloClient/Queries/referralPartners';

const {Option} = Select;

export default ({value, onChange, defaultValue, defaultSearch}) => {
  const [searchText, setSearchText] = useState(defaultSearch || '');
  const {data, loading, networkStatus} = useQuery(REFERRAL_PARTNERS, {
    variables: {
      searchText,
      roles: ['referral'],
      limit: 5,
    },
  });

  useEffect(() => {
    setSearchText(defaultSearch);
  }, [defaultSearch]);

  let options = [];

  if (defaultValue) {
    options.push(defaultValue);
  }

  if (data && data.referralPartners && data.referralPartners.users) {
    data.referralPartners.users.forEach((user) => {
      if (user.referralProfile) {
        options.push(user.referralProfile);
      }
    });
  }

  // if this is the first time loading, wait to load the input
  if (loading && networkStatus === 1) return <div style={{height: 48}} />;

  return (
    <DropdownStyleWrapper>
      <Select
        value={value}
        onSearch={(value) => setSearchText(value)}
        showSearch
        placeholder="Select a referral partner (optional)"
        style={{width: '100%'}}
        showArrow={false}
        filterOption={false}
        notFoundContent={loading ? 'searching...' : 'No result'}
        onChange={onChange}
      >
        {options &&
          options.map((partner) => {
            return (
              <Option key={partner.id}>
                {partner.firstName} {partner.lastName} ({partner.email})
              </Option>
            );
          })}
      </Select>
    </DropdownStyleWrapper>
  );
};
