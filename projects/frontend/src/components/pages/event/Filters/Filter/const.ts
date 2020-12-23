import { Icons } from '~components/IconButton';
import { AnswersFilter } from '~store/modules/answers';

export const getAriaLabel = (
  (filter: AnswersFilter): string => {
    switch (filter) {
      case AnswersFilter.Liked: {
        return 'most liked answers';
      }

      case AnswersFilter.Mine: {
        return 'my answers';
      }

      default:
      case AnswersFilter.Recent: {
        return 'most recent answers';
      }
    }
  }
);

export const getIcon = (
  (filter: AnswersFilter): Icons => {
    switch (filter) {
      case AnswersFilter.Liked: {
        return Icons.Heart;
      }

      case AnswersFilter.Mine: {
        return Icons.Person;
      }

      default:
      case AnswersFilter.Recent: {
        return Icons.Clock;
      }
    }
  }
);
