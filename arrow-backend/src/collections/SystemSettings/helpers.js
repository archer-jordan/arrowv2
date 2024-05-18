import SystemSettings from 'collections/SystemSettings/model';

export default {
  getCurrentSetting: async () => {
    let currentSettings = await SystemSettings.find({});
    if (currentSettings && currentSettings.length > 0) {
      return currentSettings[0];
    } else {
      throw new Error('No system settings exists');
    }
  },
};
