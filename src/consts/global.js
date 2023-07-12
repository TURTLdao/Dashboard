/*
  Copyright (c) 2023 - The TurtleDAO Platform
*/

const PLATFORM_VERSION_NO = '1.7';
const PLATFORM_VERSION = 'v' + PLATFORM_VERSION_NO;
const PLATFORM_VERSION_LONG = 'Version: ' + PLATFORM_VERSION_NO;

const TT_BUILD_ID = 'yOIaXK_oBgVyiSJp4VCRr';

const LATEST_NEWS = {
  0: {
    title: 'Platform launched its Address Explorer',
    content: "The TurtleDAO team have been hard at work to give you, the user, a valuable tool." +
      " Although an underrated tool, the Address Explorer can teach you a few things. " +
      "We will support other explorers very soon, currently a work-in-progress (WIP). ",
    date: '10/07/2023',
    link_title: 'Search Address',
    link: '/cardano/search'
  },
  1: {
    title: 'TurtleDAO v1.7 update',
    content: "The platform has undergone a revamp since its initial beta." +
      " Since the creation of the platform, we have included more projects to " +
      "support and even more tools for all Cardano users.",
    date: '04/07/2023',
    link_title: '',
    link: ''
  },
};

module.exports = {
  PLATFORM_VERSION_NO,
  PLATFORM_VERSION,
  PLATFORM_VERSION_LONG,
  TT_BUILD_ID,
  LATEST_NEWS,
};
