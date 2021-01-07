import React from 'react';

import { renderToString } from 'react-dom/server';
import { RendererProvider } from 'react-fela';
import { renderToSheetList } from 'fela-dom';
import { renderer } from '~themes';

import type { ReplaceRendererArgs } from 'gatsby';

export default (
  function replaceRenderer (props: ReplaceRendererArgs): void {
    const { bodyComponent } = props;
    const { replaceBodyHTMLString } = props;
    const { setHeadComponents } = props;

    const bodyHTML = (
      renderToString(
        <RendererProvider renderer={renderer}>
          {bodyComponent}
        </RendererProvider>,
      )
    );

    const sheetList = renderToSheetList(renderer);

    const elements = (
      sheetList.map((sheet) => (
        <style
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: sheet.css }}
          data-fela-type={sheet.type}
          data-fela-support={sheet.support}
          key={`${sheet.type}-${sheet.media}`}
          media={sheet.media}
        />
      ))
    );

    replaceBodyHTMLString(bodyHTML);
    setHeadComponents(elements);
  }
);
