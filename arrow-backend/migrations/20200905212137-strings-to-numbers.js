module.exports = {
  async up(db, client) {
    // write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    const docs = await db.collection.get('customerreports').find({}).toArray();

    const operations = docs.map((report) => {
      return db.collection('customerreports').updateOne(
        {_id: report._id},
        {
          $set: {
            totalHours: parseInt(report.totalHours),
            totalFringe: parseInt(report.totalFringe),
            activeThisMonth: parseInt(report.activeThisMonth),
            totalVHS: parseInt(report.totalVHS),
          },
        }
      );
    });
    return Promise.all(operations);
  },

  async down(db, client) {
    const docs = await db.collection.get('customerreports').find({}).toArray();

    const operations = docs.map((report) => {
      return db.collection('customerreports').updateOne(
        {_id: report._id},
        {
          $set: {
            totalHours: report.totalHours.toString(),
            totalFringe: report.totalFringe.toString(),
            activeThisMonth: report.activeThisMonth.toString(),
            totalVHS: report.totalVHS.toString(),
          },
        }
      );
    });
    return Promise.all(operations);
  },
};
