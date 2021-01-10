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
        <RendererProvider renderer={renderer} rehydrate>
          {bodyComponent}
        </RendererProvider>,
      )
    );

    const sheetList = renderToSheetList(renderer);

    const elements = (
      sheetList.map(
        (sheet) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { rehydration, type } = sheet as any;

          return (
            <style
              type="text/css"
              media={sheet.media}
              data-fela-support={sheet.support}
              data-fela-rehydration={rehydration}
              data-fela-type={type}

              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: sheet.css }}
            />
          );
        },
      )
    );

    replaceBodyHTMLString(bodyHTML);
    setHeadComponents(elements);
  }
);
