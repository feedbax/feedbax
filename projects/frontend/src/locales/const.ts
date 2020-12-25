export const defaultLocale = 'de';

export const translationFragment = `
  fragment translationData on Translation {
    data {
      generic {
        footer {
          privacy_policy
          imprint
          disclaimer
        }

        cookie_consent {
          content
          title
          small
        }

        locales {
          de
          en
          hr
          it
          pl
        }
      }
      
      home {
        lets_go
        see_more
        your_tool

        benefit_1
        benefit_2
        benefit_3

        benefit_6 {
          content_1
          title
        }

        benefit_5 {
          content_1
          content_2
          title
        }

        benefit_4 {
          content_1
          content_2
          title
        }
      }

      menu {
        change_locale
        login
        logout
        register
      }
    }
  }
`;
