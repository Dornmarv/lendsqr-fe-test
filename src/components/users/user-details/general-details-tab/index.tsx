import { User } from '@/lib/types';
import InfoSection from '../info-section';

interface GeneralDetailsTabProps {
    user: User;
}

export default function GeneralDetailsTab({ user }: GeneralDetailsTabProps) {
    const personalInfoItems = [
        { label: 'FULL NAME', value: user.personalInfo.fullName },
        { label: 'PHONE NUMBER', value: user.personalInfo.phoneNumber },
        { label: 'EMAIL ADDRESS', value: user.personalInfo.emailAddress },
        { label: 'BVN', value: user.personalInfo.bvn },
        { label: 'GENDER', value: user.personalInfo.gender },
        { label: 'MARITAL STATUS', value: user.personalInfo.maritalStatus },
        { label: 'CHILDREN', value: user.personalInfo.children },
        { label: 'TYPE OF RESIDENCE', value: user.personalInfo.typeOfResidence },
    ];

    const educationItems = [
        { label: 'LEVEL OF EDUCATION', value: user.educationAndEmployment.levelOfEducation },
        { label: 'EMPLOYMENT STATUS', value: user.educationAndEmployment.employmentStatus },
        { label: 'SECTOR OF EMPLOYMENT', value: user.educationAndEmployment.sectorOfEmployment },
        { label: 'DURATION OF EMPLOYMENT', value: user.educationAndEmployment.durationOfEmployment },
        { label: 'OFFICE EMAIL', value: user.educationAndEmployment.officeEmail },
        { label: 'MONTHLY INCOME', value: user.educationAndEmployment.monthlyIncome },
        { label: 'LOAN REPAYMENT', value: user.educationAndEmployment.loanRepayment },
    ];

    const socialItems = [
        { label: 'TWITTER', value: user.socials.twitter },
        { label: 'FACEBOOK', value: user.socials.facebook },
        { label: 'INSTAGRAM', value: user.socials.instagram },
    ];

    const guarantorItems = [
        { label: 'FULL NAME', value: user.guarantor.fullName },
        { label: 'PHONE NUMBER', value: user.guarantor.phoneNumber },
        { label: 'EMAIL ADDRESS', value: user.guarantor.emailAddress },
        { label: 'RELATIONSHIP', value: user.guarantor.relationship },
    ];

    return (
        <>
            <InfoSection title="Personal Information" items={personalInfoItems} />
            <InfoSection title="Education and Employment" items={educationItems} columns={4} />
            <InfoSection title="Socials" items={socialItems} />
            <InfoSection title="Guarantor" items={guarantorItems} />
            {/* Second Guarantor (static for demo) */}
            <InfoSection items={guarantorItems} />
        </>
    );
}
