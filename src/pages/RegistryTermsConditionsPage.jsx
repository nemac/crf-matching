import { Typography, Box } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const definitions = [
  {
    term: 'CSCI Partners',
    meaning:
      'means the Climate Smart Communities Initiative project partners who are the Climate Resilience Fund, EcoAdapt, Fernleaf, ICF, Geos Institute and Natural Resources Defense Council (NRDC).',
  },
  {
    term: 'Adaptation Registry Products',
    meaning:
      'means on-line components, associated web pages, print materials and other products of the CSCI Partners including but not limited to the Registry of Adaptation Practitioners and Climate Smart Communities Initiative.',
  },
  {
    term: 'Organization',
    meaning:
      'means the organization whose name appears on the line marked “Organization name” on the registry application form.',
  },
  {
    term: 'Organization Marks',
    meaning:
      'means Organization’s name, logo, and other marks Organization makes available to the CSCI Partners under the limited license granted by these terms and conditions.',
  },
];

export default function RegistryTermsConditionsPage() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          py: 4,
          px: { xs: 2, sm: 4, md: 12 },
          bgcolor: '#FFFFFF',
          borderRight: '1px solid #E5E7EB',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography
              variant="eyebrow"
              sx={{
                textAlign: 'center',
              }}
            >
              TERMS & CONDITIONS
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography
              variant="h1"
              sx={{
                textAlign: 'center',
              }}
            >
              Registry of Adaptation Practitioners Terms & Conditions
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ px: { xs: 2, sm: 4, md: 12 }, py: 4, bgcolor: '#FFFFFF' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            py: 1,
            gap: 0.5,
            mb: 3,
          }}
        >
          <Typography variant="h3" sx={{ py: 0.5 }}>
            Agreement
          </Typography>
          <Typography component="div" variant="body1">
            <strong>
              These Terms and Conditions create a binding agreement between the
              CSCI Partners and Organization when an application is submitted
              for inclusion in the Registry of Adaptation Practitioners.
            </strong>
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            py: 1,
            gap: 0.5,
            mb: 3,
          }}
        >
          <Typography variant="h3" sx={{ py: 0.5 }}>
            Definitions
          </Typography>
          <Typography component="div" variant="body1">
            As used in this Registry of Adaptation Practitioners Terms and
            Conditions, the capitalized terms appearing below have the following
            meanings:
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mb: 2,
            }}
          >
            {definitions.map(definition => (
              <Box
                key={definition.term}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  py: .25,
                  px: 2,
                  gap: 2,
                }}
              >
                <FiberManualRecordIcon
                  sx={{
                    color: 'primary.ctaDarkBlue',
                    fontSize: 12,
                    flexShrink: 0,
                  }}
                />
                <Typography component="div" variant="body1">
                  <strong>“{definition.term}”</strong> {definition.meaning}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            py: 1,
            gap: 0.5,
            mb: 3,
          }}
        >
          <Typography variant="h3" sx={{ py: 0.5 }}>
            Limited License and Publicity Release to CSCI Partners
          </Typography>
          <Typography component="div" variant="body1">
            Organization grants CSCI Partners, individually and collectively, a
            limited, revocable, non-exclusive, worldwide license to use and
            publicly display, and authorize their agents to use and publicly
            display Organization’s Marks, subject to the reasonable formatting
            requirements of Organization, within the Adaptation Registry
            Products. The size and placement of Organization’s Marks, and
            whether to publicly display Organization’s Marks, within the
            Adaptation Registry Products shall be at the sole discretion of
            CSCI Partners. Organization represents and warrants that it has the
            full right and authority to grant the rights herein to CSCI
            Partners; that it has not previously in any manner disposed of any
            of the rights herein granted to CSCI Partners nor previously
            granted any rights adverse thereto or inconsistent therewith; that
            there are no rights outstanding which would diminish, encumber or
            impair the full enjoyment or exercise of the rights herein granted
            to CSCI Partners; and that Organization’s Marks and information
            provided through the application form and subsequent
            communications do not and will not violate or infringe upon any
            patent, copyright, literary, privacy, publicity, trademark, service
            mark, or any other personal or property right of any third party,
            nor will same constitute a libel or defamation of any third party.
            CSCI Partners reserve the right to remove Organization’s listing
            from the Adaptation Registry Products and to cease displaying
            Organization’s Marks therein at any time and at CSCI Partners’ sole
            discretion.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            py: 1,
            gap: 0.5,
            mb: 3,
          }}
        >
          <Typography variant="h3" sx={{ py: 0.5 }}>
            Compliance with Laws
          </Typography>
          <Typography component="div" variant="body1">
            Organization represents and warrants that it will comply with all
            applicable laws and regulations in connection with its performance
            under these Terms and Conditions.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            py: 1,
            gap: 0.5,
            mb: 3,
          }}
        >
          <Typography variant="h3" sx={{ py: 0.5 }}>
            Liability & Indemnification
          </Typography>
          <Typography component="div" variant="body1">
            Organization shall at all times defend, indemnify, and hold
            harmless each of CSCI Partners and their respective directors,
            officers, agents, employees and volunteers, against and from all
            claims, demands, actions, loss, costs, or liability of every kind
            (including reasonable legal fees and expenses) arising from, in
            connection with, or by reason of: (1) Organization’s application to
            be listed, or listing, within any or all of the Adaptation Registry
            Products, or (2) any actual or alleged breach or other violation by
            Organization of these Terms and Conditions.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            py: 1,
            gap: 0.5,
            mb: 3,
          }}
        >
          <Typography variant="h3" sx={{ py: 0.5 }}>
            Disclaimer of Warranties
          </Typography>
          <Typography component="div" variant="body1">
            The Adaptation Registry Products are made available on an “as is”
            and “as available” basis. CSCI Partners make no warranties or
            representations of any kind, express or implied, regarding the
            Adaptation Registry Products, including without limitation.
            Organization’s use of, and listing, if applicable, within, the
            Adaptation Registry Products is at Organization’s sole risk.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            py: 1,
            gap: 0.5,
            mb: 3,
          }}
        >
          <Typography variant="h3" sx={{ py: 0.5 }}>
            Dispute Resolution
          </Typography>
          <Typography component="div" variant="body1">
            Organization unconditionally agrees that any dispute or claim
            arising from or in connection with these Terms and Conditions or
            the Adaptation Registry Products shall be resolved by neutral,
            exclusive and binding arbitration in Kitsap County, Washington,
            USA, or another venue if Organization and CSCI Partners mutually
            agree to such other venue in writing. Provided, however, that
            nothing herein shall require arbitration of any claim or charge
            which, by law, cannot be the subject of a compulsory arbitration
            agreement.
          </Typography>
          <Typography component="div" variant="body1">
            The arbitration shall be administered by the American Arbitration
            Association (“AAA”) under its rules. Any arbitration proceeding
            brought under this Agreement shall be conducted before one
            arbitrator. The arbitrator shall be selected in accordance with the
            AAA Rules. Each party to any dispute shall pay its own expenses and
            fees, including attorneys’ fees. Subject to whatever limitations,
            if any, exist in the applicable law on such remedies the arbitrator
            will be empowered to award either party any remedy at law or in
            equity that the party would otherwise have been entitled to had the
            matter been litigated in court, including injunctive relief, costs
            and attorney fees; provided, however, that the arbitrator is not
            empowered to award punitive or exemplary damages, and the parties
            waive any right to recover any such damages to the greatest extent
            permitted by law. The arbitrator shall issue a decision or award in
            writing, stating the essential findings of fact and conclusions of
            law.
          </Typography>
          <Typography component="div" variant="body1">
            Either party may appear telephonically at the arbitration hearing.
            The award of the arbitrator may be enforced in any court of
            competent jurisdiction located in the State of Washington, USA. In
            the event that the arbitration clause is deemed void or
            inapplicable, each party expressly consents to and submits to the
            personal jurisdiction of the federal or state court(s) of Kitsap
            County, Washington, USA. Any arbitration proceedings, decision or
            award rendered hereunder, and the validity, effect and
            interpretation of this arbitration provision, shall be governed by
            the Federal Arbitration Act, 9 U.S.C. § 1 et seq.
          </Typography>
          <Typography component="div" variant="body1">
            THIS SECTION LIMITS CERTAIN RIGHTS, INCLUDING THE RIGHT TO MAINTAIN
            A COURT ACTION, THE RIGHT TO A JURY TRIAL, THE RIGHT TO ENGAGE IN
            DISCOVERY EXCEPT AS PROVIDED IN AAA RULES, AND THE RIGHT TO CERTAIN
            REMEDIES AND FORMS OF RELIEF. OTHER RIGHTS THAT YOU OR CSCI Partners
            WOULD HAVE IN COURT ALSO MAY NOT BE AVAILABLE IN ARBITRATION.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            py: 1,
            gap: 0.5,
            mb: 3,
          }}
        >
          <Typography variant="h3" sx={{ py: 0.5 }}>
            Waiver & Severability
          </Typography>
          <Typography component="div" variant="body1">
            No waiver of any provision of these Terms and Conditions shall be
            valid unless in writing and signed by CSCI Partners. If any portion
            of these Terms and Conditions is determined to be unenforceable or
            invalid, such determination shall not be deemed to affect the
            enforceability or validity of the remainder of these Terms and
            Conditions.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            py: 1,
            gap: 0.5,
            mb: 3,
          }}
        >
          <Typography variant="h3" sx={{ py: 0.5 }}>
            Changes to Terms
          </Typography>
          <Typography component="div" variant="body1">
            These Terms and Conditions may be modified at any time and from
            time to time by CSCI Partners. CSCI Partners also reserve the right
            to make modifications to these Terms and Conditions as may
            reasonably be needed to comply with applicable laws or to account
            for changes in CSCI Partners’ business, or other factors. If
            Organization continues to use the Adaptation Registry Products or
            does not request the removal of Organization’s Marks from the
            Adaptation Registry Products within fourteen days after changes to
            these Terms and Conditions have been posted, Organization’s will be
            deemed to have agreed to such changes.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            py: 1,
            gap: 0.5,
            mb: 3,
          }}
        >
          <Typography variant="h3" sx={{ py: 0.5 }}>
            Date of Agreement
          </Typography>
          <Typography component="div" variant="body1">
            Effective as of: 20 March 2025
          </Typography>
          <Typography component="div" variant="body1">
            Last Updated: 19 March 2025
          </Typography>
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
