import { widescreenMinimumWidth } from '../constants/style-constants';

const ToggleSideBarByScreenSize = (isOpenSideBar, width, setIsOpenSideBar) => {
  if (!isOpenSideBar && width > widescreenMinimumWidth) {
    setIsOpenSideBar(true);
  }
  if (isOpenSideBar && width < widescreenMinimumWidth) {
    setIsOpenSideBar(false);
  }
};

export default ToggleSideBarByScreenSize;
