import SystemSettings from 'collections/SystemSettings/model';

export default async () => {
  try {
    let settings = await SystemSettings.find();
    if (!settings || settings.length === 0) {
      let defaultSetting = {
        minimumReferralHours: 66,
        referralRate: 1200,
      };
      let newDoc = new SystemSettings(defaultSetting);
      await newDoc.save();
      console.log('=====> default setting inserted');
    }
  } catch (err) {
    console.log(err);
  }
};
