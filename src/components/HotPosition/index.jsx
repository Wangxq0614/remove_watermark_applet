import { useState, useEffect } from 'react';
import { View, Ad, Image } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { Grid } from '@nutui/nutui-react-taro';
import { getGlobalConfig } from '@/src/http/api.js';

/**
 *
 * @param {*} exclude 排除的工具 名称
 * @param {*} isShowAll 是否显示全部工具
 * @returns
 */

export default function HotPosition({ exclude, isShowAll = false }) {
  const [randomToolsList, setRandomToolsList] = useState([]);

  useEffect(() => {
    getSetting();
  }, []);

  // 获取工具列表
  const getSetting = async () => {
    const res = await getGlobalConfig();
    const toolsList = res.data.toolList;

    setRandomToolsList(toolsList);

    let tempToolsList = toolsList;

    // 过滤掉不需要的工具
    if (exclude) {
      tempToolsList = toolsList.filter((item) => {
        return !exclude.includes(item.url);
      });

      setRandomToolsList(tempToolsList);
    }

    if (!isShowAll) {
      // 随机抽取3个工具
      if (toolsList.length > 3) {
        tempToolsList = tempToolsList
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        setRandomToolsList(tempToolsList);
      }
    }
  };

  // 点击工具
  const handleClickGridItem = (item) => {
    const { type, url, appid, title } = item;

    if (type === 'page') {
      Taro.navigateTo({
        url: `/subPages/${url}/index`,
      });
    } else if (type === 'applet') {
      Taro.navigateToMiniProgram({
        appId: appid,
      });
    } else if (type === 'webview') {
      const resData = {
        title,
        url,
      };
      Taro.navigateTo({
        url: `/subPages/WebLink/index?data=${encodeURIComponent(
          JSON.stringify(resData)
        )}`,
      });
    } else {
      Taro.showToast({
        title: '暂未开放',
        icon: 'none',
      });
    }
  };

  return (
    <Grid
      style={{ width: '100%', margin: '10px 0' }}
      gap={3}
      columns={3}>
      {randomToolsList.map((item, index) => {
        return (
          <Grid.Item
            style={{
              borderRadius: '10px',
            }}
            onClick={() => handleClickGridItem(item)}
            key={item.title}
            text={item.title}>
            <Image
              src={item.icon}
              mode="widthFix"
              style={{ width: '35px', height: '35px' }}
            />
          </Grid.Item>
        );
      })}
    </Grid>
  );
}
