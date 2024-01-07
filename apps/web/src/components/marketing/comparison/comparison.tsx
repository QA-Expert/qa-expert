import { FEATURES } from '@/components/marketing/features/features';
import {
  PlatformColumn,
  Props as PlatformProps,
} from '@/components/marketing/comparison/platform-column';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import { Row } from '@/components/row/row';
import { FeaturesColumn } from './features-column';

export function Comparison() {
  const PLATFORMS: PlatformProps[] = [
    {
      name: 'udemi',
      features: [
        { ...FEATURES[0], checked: true },
        { ...FEATURES[1], checked: true },
        { ...FEATURES[2], checked: false },
        { ...FEATURES[3], checked: true },
        { ...FEATURES[4], checked: true },
      ],
      icon: <IntegrationInstructionsIcon sx={{ fontSize: '3rem' }} />,
    },
    {
      name: 'coursera',
      features: [
        { ...FEATURES[0], checked: true },
        { ...FEATURES[1], checked: false },
        { ...FEATURES[2], checked: true },
        { ...FEATURES[3], checked: false },
        { ...FEATURES[4], checked: true },
      ],
      icon: <IntegrationInstructionsIcon sx={{ fontSize: '3rem' }} />,
    },
    {
      name: 'qaexpert',
      features: [
        { ...FEATURES[0], checked: true },
        { ...FEATURES[1], checked: true },
        { ...FEATURES[2], checked: true },
        { ...FEATURES[3], checked: true },
        { ...FEATURES[4], checked: true },
      ],
      icon: <IntegrationInstructionsIcon sx={{ fontSize: '3rem' }} />,
    },
  ];

  return (
    <Row
      sx={{
        gap: '1rem',
        justifyContent: 'center',
        alignItems: 'end',
        flexWrap: 'wrap',
      }}
    >
      <FeaturesColumn
        features={[
          FEATURES[0],
          FEATURES[1],
          FEATURES[2],
          FEATURES[3],
          FEATURES[4],
        ]}
      />

      {PLATFORMS.map((platform) => (
        <PlatformColumn key={platform.name} {...platform} />
      ))}
    </Row>
  );
}
