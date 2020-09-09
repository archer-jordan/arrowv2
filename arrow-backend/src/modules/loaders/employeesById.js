import Employees from 'collections/Employees/model';
import DataLoader from 'dataloader';

export default () =>
  new DataLoader(async (ids) => {
    return await Employees.find({_id: {$in: ids}});
  });
