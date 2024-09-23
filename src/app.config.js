export default defineAppConfig({
  pages: [
    'pages/RemoveWatermark/index',
    'pages/AnalysisDetails/index',
    'pages/FAQ/index',
    'pages/Tutorial/index',
    'pages/CreateActivationCode/index',
  ],
  subPackages: [
    {
      root: 'subPages/',
      pages: [
        'ToolsList/index',
        'ExpressQuery/index',
        'HotSearchList/index',
        'WebLink/index',
        'EatTodayWhat/index',
        'TvBoxOffice/index',
        'CrazyThursday/index',
        'HistoryToday/index',
        'GoldPrice/index',
        'RandomPassword/index',
      ],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
});
