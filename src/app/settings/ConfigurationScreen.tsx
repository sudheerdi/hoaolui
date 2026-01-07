"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";

type TabType =
  | "violation-schedule"
  | "escalation-policy"
  | "amenities-reservations"
  | "notification-settings";

interface ViolationRecord {
  id: string;
  type: string;
  compliancePeriod: string;
  responsePeriod: string;
  fine: string;
  interestRate: string;
  lateFeePolicy: string;
  notes: string;
  isEditing?: boolean;
  isAdded?: boolean;
}

interface EscalationRecord {
  id: string;
  noticeNumber: string;
  action: string;
  calculation: string;
  isEditing?: boolean;
  isAdded?: boolean;
}

interface AmenityRecord {
  id: string;
  type: string;
  typicalFee: string;
  refundable: string;
  notes: string;
  isEditing?: boolean;
  isAdded?: boolean;
}

interface NotificationSetting {
  id: string;
  userRole: string;
  notificationCategory: string;
  notificationDescription: string;
  deliveryChannel: string;
  defaultFrequency: string;
  optionalFrequencies: string;
  notes: string;
  enabled: boolean;
}

export default function ConfigurationScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("violation-schedule");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const [violationRecords, setViolationRecords] = useState<ViolationRecord[]>(
    []
  );
  const sampleViolations: ViolationRecord[] = [
    {
      id: "1",
      type: "Minor Maintenance (Grass, Trash Area, Mailbox/unit, Guest)",
      compliancePeriod: "7-14 days",
      responsePeriod: "5 days",
      fine: "$5",
      interestRate: "—",
      lateFeePolicy: "Flat $5 if unpaid after 15 days",
      notes: "Provides fair window for homeowners to correct minor issues.",
      isAdded: false,
    },
    {
      id: "2",
      type: "Pets (Noise, Parking)",
      compliancePeriod: "5-7 days",
      responsePeriod: "5 days",
      fine: "$5",
      interestRate: "—",
      lateFeePolicy: "$5 or 5% per month on unpaid balance",
      notes: "These violations can usually be resolved quickly.",
      isAdded: false,
    },
    {
      id: "3",
      type: "Major or Architectural",
      compliancePeriod: "15-30 days",
      responsePeriod: "5 days",
      fine: "$5",
      interestRate: "—",
      lateFeePolicy: "$5 or 5% per month on unpaid balance",
      notes:
        "Allows sufficient time to submit architectural requests or obtain approval.",
      isAdded: false,
    },
    {
      id: "4",
      type: "Fence, Construction without approval, Mechanical Repair",
      compliancePeriod: "24-72 hours",
      responsePeriod: "24 hours",
      fine: "$5",
      interestRate: "—",
      lateFeePolicy: "Immediate fine, $25 one fee if unresolved",
      notes:
        "Immediate action required, HOA may take immediate action required, HOA may take immediate action required.",
      isAdded: false,
    },
    {
      id: "5",
      type: "Repeated Items, not yet collected, smoke, fire",
      compliancePeriod: "—",
      responsePeriod: "—",
      fine: "$5",
      interestRate: "—",
      lateFeePolicy: "Immediate fine, $25 one fee if unresolved",
      notes:
        "Adjustments approved by Board per HOA policy and financial schedule.",
      isAdded: false,
    },
    {
      id: "6",
      type: "HOA Late Fees",
      compliancePeriod: "—",
      responsePeriod: "—",
      fine: "—",
      interestRate: "10%",
      lateFeePolicy: "Flat $5 if unpaid after 15 days",
      notes: "May incur additional fines or escalation under HOA policy.",
      isAdded: false,
    },
    {
      id: "7",
      type: "Other Violations",
      compliancePeriod: "—",
      responsePeriod: "N/A",
      fine: "$5",
      interestRate: "10%",
      lateFeePolicy: "$5 flat fee or 5% of outstanding balance after 30 days",
      notes:
        "Applies to monthly or quarterly HOA dues. Late fees and interest accrue monthly until paid in full.",
      isAdded: false,
    },
    {
      id: "8",
      type: "Late Assessment / Dues Payment",
      compliancePeriod: "—",
      responsePeriod: "N/A",
      fine: "$5",
      interestRate: "10%",
      lateFeePolicy: "$5 flat fee or 5% of outstanding balance after 30 days",
      notes:
        "Applies to monthly or quarterly HOA dues. Late fees and interest accrue monthly until paid in full.",
      isAdded: false,
    },
  ];

  const [escalationRecords, setEscalationRecords] = useState<
    EscalationRecord[]
  >([]);
  const sampleEscalations: EscalationRecord[] = [
    {
      id: "1",
      noticeNumber: "01",
      action: "Homeowner will be charged with a Late Fee for missed payment.",
      calculation: "$100 (Monthly HOA Fee) + $5 (Late Fee) = $105",
      isAdded: false,
    },
    {
      id: "2",
      noticeNumber: "02",
      action:
        "Homeowner will be charged with previous balance + 10% interest on overdue amount + current month + late fee.",
      calculation:
        "$105 (Previous Month Balance) + $10.5 (10% Interest) + $100 (Current Month) + $5 (Late Fee) = $220.5",
      isAdded: false,
    },
    {
      id: "3",
      noticeNumber: "03",
      action:
        "First Notice sent to homeowner including total due and late fee reminder.",
      calculation:
        "$220.5 (Previous Due) + $22 (10% Interest) + $100 (Current Month) + $5 (Late Fee) = $347.5",
      isAdded: false,
    },
    {
      id: "4",
      noticeNumber: "04",
      action: "Second Notice sent to homeowner with escalation warning.",
      calculation:
        "$347.5 (Previous Balance) + $34.75 (10% Interest) + $100 (Current Month) + $5 (Late Fee) = $487.25",
      isAdded: false,
    },
    {
      id: "5",
      noticeNumber: "05",
      action:
        "Attorney Notice - HOA attorney issues a formal civil notice with legal and administrative charges added.",
      calculation:
        "$487.25 (Balance) + $48.7 (10% Interest) + $100 (Current Month) + $5 (Late Fee) = $640.95",
      isAdded: false,
    },
    {
      id: "6",
      noticeNumber: "06",
      action:
        "If still unresolved, HOA Board will work with the Attorney and Realtor to initiate property lien or listing for sale as per HOA By-Laws.",
      calculation:
        "Final balance (including legal fees, realtor fees, and sale deductions) to be settled from property sale proceeds.",
      isAdded: false,
    },
  ];

  const [amenityRecords, setAmenityRecords] = useState<AmenityRecord[]>([]);
  const sampleAmenities: AmenityRecord[] = [
    {
      id: "1",
      type: "Clubhouse Rental",
      typicalFee: "$50-$200",
      refundable: "Yes, if left clean and undamaged",
      notes: "May vary based on duration or event size.",
      isAdded: false,
    },
    {
      id: "2",
      type: "Pool Reservation",
      typicalFee: "$25",
      refundable: "No",
      notes: "Lifeguard coverage may require additional payment.",
      isAdded: false,
    },
    {
      id: "3",
      type: "Cleaning / Damage Deposit",
      typicalFee: "$100",
      refundable: "Yes",
      notes: "Refunded after inspection within 7 days.",
      isAdded: false,
    },
    {
      id: "4",
      type: "Security Deposit (optional)",
      typicalFee: "$200",
      refundable: "Yes",
      notes: "Required for large private events.",
      isAdded: false,
    },
  ];

  const [notificationSettings, setNotificationSettings] = useState<
    NotificationSetting[]
  >([
    {
      id: "1",
      userRole: "Homeowner",
      notificationCategory: "Payments",
      notificationDescription: "Payment reminder before due date",
      deliveryChannel: "Email, SMS",
      defaultFrequency: "Instant",
      optionalFrequencies: "Daily, None",
      notes: "Sent 5 and 1 day before due",
      enabled: true,
    },
    {
      id: "2",
      userRole: "Homeowner",
      notificationCategory: "Payments",
      notificationDescription: "Payment confirmation / receipt",
      deliveryChannel: "Email",
      defaultFrequency: "Instant",
      optionalFrequencies: "None",
      notes: "After successful payment",
      enabled: true,
    },
    {
      id: "3",
      userRole: "Homeowner",
      notificationCategory: "Payments",
      notificationDescription: "Late fee notice",
      deliveryChannel: "Email, SMS",
      defaultFrequency: "Instant",
      optionalFrequencies: "Weekly",
      notes: "When late fee is applied",
      enabled: false,
    },
    {
      id: "4",
      userRole: "Homeowner",
      notificationCategory: "Violations",
      notificationDescription: "New violation notice",
      deliveryChannel: "Email, SMS, Push",
      defaultFrequency: "Instant",
      optionalFrequencies: "None",
      notes: "Includes violation details & photo",
      enabled: true,
    },
    {
      id: "5",
      userRole: "Homeowner",
      notificationCategory: "Violations",
      notificationDescription: "Violation appeal response",
      deliveryChannel: "Email",
      defaultFrequency: "Instant",
      optionalFrequencies: "None",
      notes: "Appeal approved / denied",
      enabled: true,
    },
    {
      id: "6",
      userRole: "Homeowner",
      notificationCategory: "Architectural Requests",
      notificationDescription: "Architectural request submitted",
      deliveryChannel: "Email",
      defaultFrequency: "Instant",
      optionalFrequencies: "None",
      notes: "Confirmation to homeowner",
      enabled: true,
    },
    {
      id: "7",
      userRole: "Homeowner",
      notificationCategory: "Architectural Requests",
      notificationDescription: "Architectural request decision",
      deliveryChannel: "Email",
      defaultFrequency: "Instant",
      optionalFrequencies: "Weekly",
      notes: "Approved / rejected",
      enabled: true,
    },
    {
      id: "8",
      userRole: "Homeowner",
      notificationCategory: "Announcements",
      notificationDescription: "Community announcements & news",
      deliveryChannel: "Email, In-App",
      defaultFrequency: "Weekly",
      optionalFrequencies: "Instant, None",
      notes: "Newsletters and updates",
      enabled: true,
    },
    {
      id: "9",
      userRole: "Homeowner",
      notificationCategory: "Meetings & Polls",
      notificationDescription: "Meeting / poll created",
      deliveryChannel: "Email, Push",
      defaultFrequency: "Instant",
      optionalFrequencies: "Weekly",
      notes: "Includes RSVP / voting links",
      enabled: true,
    },
    {
      id: "10",
      userRole: "Homeowner",
      notificationCategory: "Documents & Rules",
      notificationDescription: "New / updated governing documents",
      deliveryChannel: "Email, In-App",
      defaultFrequency: "Weekly",
      optionalFrequencies: "Daily, None",
      notes: "Rules, CC&Rs, policies",
      enabled: false,
    },
    {
      id: "11",
      userRole: "Homeowner",
      notificationCategory: "Security & Camera",
      notificationDescription: "Security alert (if integrated)",
      deliveryChannel: "Push, Email",
      defaultFrequency: "Instant",
      optionalFrequencies: "None",
      notes: "Only if community has cameras",
      enabled: true,
    },
    {
      id: "12",
      userRole: "Board Member",
      notificationCategory: "Architectural Requests",
      notificationDescription: "Request pending board decision",
      deliveryChannel: "Email, In-App",
      defaultFrequency: "Instant",
      optionalFrequencies: "None",
      notes: "ARC / ACC workflow",
      enabled: true,
    },
    {
      id: "13",
      userRole: "Board Member",
      notificationCategory: "Maintenance / Tickets",
      notificationDescription: "Maintenance summary",
      deliveryChannel: "Email",
      defaultFrequency: "Daily",
      optionalFrequencies: "Weekly",
      notes: "Ticket overview",
      enabled: true,
    },
    {
      id: "14",
      userRole: "Board Member",
      notificationCategory: "Financial",
      notificationDescription: "Financial reports / statements",
      deliveryChannel: "Email",
      defaultFrequency: "Weekly",
      optionalFrequencies: "Monthly",
      notes: "From finance module",
      enabled: true,
    },
    {
      id: "15",
      userRole: "Board Member",
      notificationCategory: "Meetings & Polls",
      notificationDescription: "Poll closed / results ready",
      deliveryChannel: "Email",
      defaultFrequency: "Instant",
      optionalFrequencies: "Weekly",
      notes: "Voting results summary",
      enabled: true,
    },
    {
      id: "16",
      userRole: "Vendor",
      notificationCategory: "Maintenance / Tickets",
      notificationDescription: "New work order assigned",
      deliveryChannel: "Email, SMS",
      defaultFrequency: "Instant",
      optionalFrequencies: "None",
      notes: "Vendor assigned to ticket",
      enabled: true,
    },
    {
      id: "17",
      userRole: "Vendor",
      notificationCategory: "Maintenance / Tickets",
      notificationDescription: "Work order status updated",
      deliveryChannel: "Email",
      defaultFrequency: "Instant",
      optionalFrequencies: "Daily",
      notes: "Status changes / notes",
      enabled: true,
    },
    {
      id: "18",
      userRole: "Vendor",
      notificationCategory: "Payments",
      notificationDescription: "Vendor payment processed",
      deliveryChannel: "Email",
      defaultFrequency: "Instant",
      optionalFrequencies: "None",
      notes: "Invoice paid",
      enabled: true,
    },
    {
      id: "19",
      userRole: "Manager / Admin",
      notificationCategory: "System / Platform",
      notificationDescription: "System error / alert",
      deliveryChannel: "Email, Push",
      defaultFrequency: "Instant",
      optionalFrequencies: "None",
      notes: "Critical system alerts",
      enabled: true,
    },
    {
      id: "20",
      userRole: "Manager / Admin",
      notificationCategory: "Usage / Activity",
      notificationDescription: "Usage / activity digest",
      deliveryChannel: "Email",
      defaultFrequency: "Daily",
      optionalFrequencies: "Weekly",
      notes: "Tenant usage metrics summary",
      enabled: true,
    },
  ]);

  const handleAddFromSample = (sampleId: string) => {
    switch (activeTab) {
      case "violation-schedule":
        const violation = sampleViolations.find((v) => v.id === sampleId);
        if (violation) {
          const newViolation = {
            ...violation,
            id: Date.now().toString(),
            isEditing: true,
            isAdded: true,
          };
          setViolationRecords((prev) => [...prev, newViolation]);
        }
        break;
      case "escalation-policy":
        const escalation = sampleEscalations.find((e) => e.id === sampleId);
        if (escalation) {
          const newEscalation = {
            ...escalation,
            id: Date.now().toString(),
            isEditing: true,
            isAdded: true,
          };
          setEscalationRecords((prev) => [...prev, newEscalation]);
        }
        break;
      case "amenities-reservations":
        const amenity = sampleAmenities.find((a) => a.id === sampleId);
        if (amenity) {
          const newAmenity = {
            ...amenity,
            id: Date.now().toString(),
            isEditing: true,
            isAdded: true,
          };
          setAmenityRecords((prev) => [...prev, newAmenity]);
        }
        break;
    }
  };

  const handleAddEmpty = () => {
    switch (activeTab) {
      case "violation-schedule":
        const newViolation: ViolationRecord = {
          id: Date.now().toString(),
          type: "",
          compliancePeriod: "",
          responsePeriod: "",
          fine: "",
          interestRate: "",
          lateFeePolicy: "",
          notes: "",
          isEditing: true,
        };
        setViolationRecords((prev) => [...prev, newViolation]);
        break;
      case "escalation-policy":
        const newEscalation: EscalationRecord = {
          id: Date.now().toString(),
          noticeNumber: "",
          action: "",
          calculation: "",
          isEditing: true,
        };
        setEscalationRecords((prev) => [...prev, newEscalation]);
        break;
      case "amenities-reservations":
        const newAmenity: AmenityRecord = {
          id: Date.now().toString(),
          type: "",
          typicalFee: "",
          refundable: "",
          notes: "",
          isEditing: true,
        };
        setAmenityRecords((prev) => [...prev, newAmenity]);
        break;
    }
  };

  const isSampleAdded = (sampleId: string) => {
    switch (activeTab) {
      case "violation-schedule":
        const violation = sampleViolations.find((v) => v.id === sampleId);
        return violationRecords.some(
          (r) =>
            r.type === violation?.type &&
            r.compliancePeriod === violation?.compliancePeriod &&
            r.fine === violation?.fine
        );
      case "escalation-policy":
        const escalation = sampleEscalations.find((e) => e.id === sampleId);
        return escalationRecords.some(
          (r) =>
            r.noticeNumber === escalation?.noticeNumber &&
            r.action === escalation?.action
        );
      case "amenities-reservations":
        const amenity = sampleAmenities.find((a) => a.id === sampleId);
        return amenityRecords.some(
          (r) =>
            r.type === amenity?.type && r.typicalFee === amenity?.typicalFee
        );
      default:
        return false;
    }
  };

  const handleSave = () => {
    switch (activeTab) {
      case "violation-schedule":
        setViolationRecords((prev) =>
          prev.map((item) => ({ ...item, isEditing: false }))
        );
        break;
      case "escalation-policy":
        setEscalationRecords((prev) =>
          prev.map((item) => ({ ...item, isEditing: false }))
        );
        break;
      case "amenities-reservations":
        setAmenityRecords((prev) =>
          prev.map((item) => ({ ...item, isEditing: false }))
        );
        break;
    }
  };

  const handleEdit = (id: string) => {
    switch (activeTab) {
      case "violation-schedule":
        setViolationRecords((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, isEditing: true } : item
          )
        );
        break;
      case "escalation-policy":
        setEscalationRecords((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, isEditing: true } : item
          )
        );
        break;
      case "amenities-reservations":
        setAmenityRecords((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, isEditing: true } : item
          )
        );
        break;
    }
  };

  const handleDelete = () => {
    switch (activeTab) {
      case "violation-schedule":
        setViolationRecords((prev) =>
          prev.filter((item) => !selectedRows.includes(item.id))
        );
        break;
      case "escalation-policy":
        setEscalationRecords((prev) =>
          prev.filter((item) => !selectedRows.includes(item.id))
        );
        break;
      case "amenities-reservations":
        setAmenityRecords((prev) =>
          prev.filter((item) => !selectedRows.includes(item.id))
        );
        break;
    }
    setSelectedRows([]);
  };

  const handleRowSelect = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleFieldChange = (id: string, field: string, value: string) => {
    switch (activeTab) {
      case "violation-schedule":
        setViolationRecords((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          )
        );
        break;
      case "escalation-policy":
        setEscalationRecords((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          )
        );
        break;
      case "amenities-reservations":
        setAmenityRecords((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          )
        );
        break;
    }
  };

  const handleNotificationToggle = (id: string) => {
    setNotificationSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const renderViolationTable = (
    records: ViolationRecord[],
    isEditable: boolean = false
  ) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead style={{ backgroundColor: "#DCDCDC" }}>
          <tr>
            {isEditable && (
              <th
                className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
                style={{ color: "#000000" }}
              >
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(records.map((r) => r.id));
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                  checked={
                    selectedRows.length === records.length && records.length > 0
                  }
                  className="cursor-pointer"
                />
              </th>
            )}
            <th
              className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
              style={{ color: "#000000", width: "15%" }}
            >
              Type
            </th>
            <th
              className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
              style={{ color: "#000000", width: "10%" }}
            >
              Compliance Period (Days)
            </th>
            <th
              className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
              style={{ color: "#000000", width: "10%" }}
            >
              Response Period (Appeal)
            </th>
            <th
              className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
              style={{ color: "#000000", width: "8%" }}
            >
              Fine ($)
            </th>
            <th
              className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
              style={{ color: "#000000", width: "10%" }}
            >
              Interest Rate (If No Response)
            </th>
            <th
              className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
              style={{ color: "#000000", width: "15%" }}
            >
              Late Fee Policy
            </th>
            <th
              className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider"
              style={{ color: "#000000", width: "20%" }}
            >
              Notes
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {records.length === 0 ? (
            <tr>
              <td
                colSpan={isEditable ? 8 : 7}
                className="px-6 py-12 text-center"
              >
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                  <p className="text-gray-500">
                    Click Add button from sample records below or create a new
                    empty record
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            records.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                {isEditable && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(record.id)}
                      onChange={() => handleRowSelect(record.id)}
                      className="cursor-pointer"
                    />
                  </td>
                )}
                <td className="px-4 py-4 text-sm font-medium text-gray-900 border-r border-gray-200">
                  {record.isEditing ? (
                    <input
                      type="text"
                      value={record.type}
                      onChange={(e) =>
                        handleFieldChange(record.id, "type", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    record.type
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                  {record.isEditing ? (
                    <input
                      type="text"
                      value={record.compliancePeriod}
                      onChange={(e) =>
                        handleFieldChange(
                          record.id,
                          "compliancePeriod",
                          e.target.value
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    record.compliancePeriod
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                  {record.isEditing ? (
                    <input
                      type="text"
                      value={record.responsePeriod}
                      onChange={(e) =>
                        handleFieldChange(
                          record.id,
                          "responsePeriod",
                          e.target.value
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    record.responsePeriod
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                  {record.isEditing ? (
                    <input
                      type="text"
                      value={record.fine}
                      onChange={(e) =>
                        handleFieldChange(record.id, "fine", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    record.fine
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                  {record.isEditing ? (
                    <input
                      type="text"
                      value={record.interestRate}
                      onChange={(e) =>
                        handleFieldChange(
                          record.id,
                          "interestRate",
                          e.target.value
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    record.interestRate
                  )}
                </td>
                <td className="px-4 py-4 text-sm font-medium text-gray-900 border-r border-gray-200">
                  {record.isEditing ? (
                    <input
                      type="text"
                      value={record.lateFeePolicy}
                      onChange={(e) =>
                        handleFieldChange(
                          record.id,
                          "lateFeePolicy",
                          e.target.value
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    record.lateFeePolicy
                  )}
                </td>
                <td className="px-4 py-4 text-sm font-medium text-gray-900">
                  {record.isEditing ? (
                    <textarea
                      value={record.notes}
                      onChange={(e) =>
                        handleFieldChange(record.id, "notes", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={2}
                    />
                  ) : (
                    record.notes
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  const renderEscalationTable = (
    records: EscalationRecord[],
    isEditable: boolean = false
  ) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead style={{ backgroundColor: "#DCDCDC" }}>
          <tr>
            {isEditable && (
              <th
                className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
                style={{ color: "#000000" }}
              >
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(records.map((r) => r.id));
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                  checked={
                    selectedRows.length === records.length && records.length > 0
                  }
                  className="cursor-pointer"
                />
              </th>
            )}
            <th
              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
              style={{ color: "#000000", width: "15%" }}
            >
              Notice #
            </th>
            <th
              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
              style={{ color: "#000000", width: "10%" }}
            >
              Action
            </th>
            <th
              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider"
              style={{ color: "#000000", width: "35%" }}
            >
              {isEditable
                ? "Calculation"
                : "Example Calculation (Monthly HOA Fee = $100)"}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {records.length === 0 ? (
            <tr>
              <td
                colSpan={isEditable ? 4 : 3}
                className="px-6 py-12 text-center"
              >
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                  <p className="text-gray-500">
                    Click Add button from sample records below or create a new
                    empty record
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            records.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                {isEditable && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(record.id)}
                      onChange={() => handleRowSelect(record.id)}
                      className="cursor-pointer"
                    />
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                  {record.isEditing ? (
                    <input
                      type="text"
                      value={record.noticeNumber}
                      onChange={(e) =>
                        handleFieldChange(
                          record.id,
                          "noticeNumber",
                          e.target.value
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    record.noticeNumber
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200">
                  {record.isEditing ? (
                    <textarea
                      value={record.action}
                      onChange={(e) =>
                        handleFieldChange(record.id, "action", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={3}
                    />
                  ) : (
                    record.action
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {record.isEditing ? (
                    <textarea
                      value={record.calculation}
                      onChange={(e) =>
                        handleFieldChange(
                          record.id,
                          "calculation",
                          e.target.value
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={3}
                    />
                  ) : (
                    record.calculation
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  const renderAmenityTable = (
    records: AmenityRecord[],
    isEditable: boolean = false
  ) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead style={{ backgroundColor: "#DCDCDC" }}>
          <tr>
            {isEditable && (
              <th
                className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
                style={{ color: "#000000" }}
              >
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(records.map((r) => r.id));
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                  checked={
                    selectedRows.length === records.length && records.length > 0
                  }
                  className="cursor-pointer"
                />
              </th>
            )}
            <th
              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
              style={{ color: "#000000", width: "15%" }}
            >
              Type
            </th>
            <th
              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
              style={{ color: "#000000", width: "10%" }}
            >
              Typical Fee
            </th>
            <th
              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
              style={{ color: "#000000", width: "10%" }}
            >
              Refundable
            </th>
            <th
              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
              style={{ color: "#000000", width: "25%" }}
            >
              Notes
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {records.length === 0 ? (
            <tr>
              <td
                colSpan={isEditable ? 5 : 4}
                className="px-6 py-12 text-center"
              >
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                  <p className="text-gray-500">
                    Click Add button from sample records below or create a new
                    empty record
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            records.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                {isEditable && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(record.id)}
                      onChange={() => handleRowSelect(record.id)}
                      className="cursor-pointer"
                    />
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                  {record.isEditing ? (
                    <input
                      type="text"
                      value={record.type}
                      onChange={(e) =>
                        handleFieldChange(record.id, "type", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    record.type
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                  {record.isEditing ? (
                    <input
                      type="text"
                      value={record.typicalFee}
                      onChange={(e) =>
                        handleFieldChange(
                          record.id,
                          "typicalFee",
                          e.target.value
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    record.typicalFee
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                  {record.isEditing ? (
                    <input
                      type="text"
                      value={record.refundable}
                      onChange={(e) =>
                        handleFieldChange(
                          record.id,
                          "refundable",
                          e.target.value
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    record.refundable
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {record.isEditing ? (
                    <textarea
                      value={record.notes}
                      onChange={(e) =>
                        handleFieldChange(record.id, "notes", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={2}
                    />
                  ) : (
                    record.notes
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  const renderNotificationTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead style={{ backgroundColor: "#DCDCDC" }}>
          <tr>
            <th
              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
              style={{ color: "#000000" }}
            >
              User Role
            </th>
            <th
              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
              style={{ color: "#000000" }}
            >
              Notification Category
            </th>
            <th
              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
              style={{ color: "#000000" }}
            >
              Notification Description
            </th>
            <th
              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
              style={{ color: "#000000" }}
            >
              Delivery Channel
            </th>
            <th
              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
              style={{ color: "#000000" }}
            >
              Default Frequency
            </th>
            <th
              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
              style={{ color: "#000000" }}
            >
              Optional Frequencies
            </th>
            <th
              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
              style={{ color: "#000000" }}
            >
              Notes
            </th>
            <th
              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider"
              style={{ color: "#000000" }}
            >
              Enable / Disable
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {notificationSettings.map((setting) => (
            <tr key={setting.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                {setting.userRole}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                {setting.notificationCategory}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200">
                {setting.notificationDescription}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                {setting.deliveryChannel}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                {setting.defaultFrequency}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                {setting.optionalFrequencies}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200">
                {setting.notes}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <button
                  onClick={() => handleNotificationToggle(setting.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                    setting.enabled ? "bg-green-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      setting.enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A1823] flex">
      <Sidebar />

      <div className="ml-[260px] flex-1 p-[10px]">
        <div className="bg-white rounded-lg h-[calc(100vh-20px)] flex flex-col overflow-hidden">
          <div className="bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4"></div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-6 h-6 flex items-center justify-center cursor-pointer">
                    <i className="ri-notification-3-line text-gray-600 text-lg"></i>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">3</span>
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  <div className="font-bold">Sunset Gardens Community</div>
                  <div className="text-xs text-gray-500">
                    1234 Garden View Drive, Miami, FL 33101
                  </div>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <i className="ri-user-line text-gray-600"></i>
                  </div>
                  <i className="ri-arrow-down-s-line text-gray-600"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6 flex-1 overflow-y-auto">
            <div className="flex space-x-2 flex-shrink-0">
              <button
                onClick={() => setActiveTab("violation-schedule")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === "violation-schedule"
                    ? "text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
                style={
                  activeTab === "violation-schedule"
                    ? { backgroundColor: "#1FA372" }
                    : {}
                }
              >
                Violation & Late fee schedule
              </button>
              <button
                onClick={() => setActiveTab("escalation-policy")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === "escalation-policy"
                    ? "text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
                style={
                  activeTab === "escalation-policy"
                    ? { backgroundColor: "#1FA372" }
                    : {}
                }
              >
                Violation & Dues Late Payment Escalation Policy
              </button>
              <button
                onClick={() => setActiveTab("amenities-reservations")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === "amenities-reservations"
                    ? "text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
                style={
                  activeTab === "amenities-reservations"
                    ? { backgroundColor: "#1FA372" }
                    : {}
                }
              >
                Amenities & Reservations
              </button>
              <button
                onClick={() => setActiveTab("notification-settings")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === "notification-settings"
                    ? "text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
                style={
                  activeTab === "notification-settings"
                    ? { backgroundColor: "#1FA372" }
                    : {}
                }
              >
                Notification Settings
              </button>
            </div>

            {activeTab !== "notification-settings" && (
              <div
                className="bg-white rounded-lg border border-gray-200 flex flex-col flex-shrink-0"
                style={{ maxHeight: "calc(50vh - 100px)" }}
              >
                <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        {activeTab === "violation-schedule" &&
                          "Violation & Late Fee Schedule"}
                        {activeTab === "escalation-policy" &&
                          "Violation & Dues Late Payment Escalation Policy"}
                        {activeTab === "amenities-reservations" &&
                          "Reservations, Fees & Deposits"}
                      </h2>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handleAddEmpty}
                        className="px-4 py-2 text-white text-sm font-medium rounded-md whitespace-nowrap cursor-pointer"
                        style={{ backgroundColor: "#1FA372" }}
                      >
                        Add
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 text-white text-sm font-medium rounded-md whitespace-nowrap cursor-pointer"
                        style={{ backgroundColor: "#1FA372" }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() =>
                          selectedRows.length > 0 && handleEdit(selectedRows[0])
                        }
                        disabled={selectedRows.length !== 1}
                        className="px-4 py-2 bg-[#1FA372] text-white text-sm font-medium rounded-md hover:bg-blue-700 whitespace-nowrap cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        Edit
                      </button>
                      <button
                        onClick={handleDelete}
                        disabled={selectedRows.length === 0}
                        className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 whitespace-nowrap cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                <div className="overflow-y-auto flex-1">
                  {activeTab === "violation-schedule" &&
                    renderViolationTable(violationRecords, true)}
                  {activeTab === "escalation-policy" &&
                    renderEscalationTable(escalationRecords, true)}
                  {activeTab === "amenities-reservations" &&
                    renderAmenityTable(amenityRecords, true)}
                </div>
              </div>
            )}

            {activeTab === "notification-settings" && (
              <div
                className="bg-white rounded-lg border border-gray-200 flex flex-col flex-shrink-0"
                style={{ maxHeight: "calc(100vh - 200px)" }}
              >
                <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      Notification Settings
                    </h2>
                    <div className="flex items-center space-x-2">
                      <button
                        className="px-4 py-2 text-white text-sm font-medium rounded-md whitespace-nowrap cursor-pointer"
                        style={{ backgroundColor: "#1FA372" }}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
                <div className="overflow-y-auto flex-1">
                  {renderNotificationTable()}
                </div>
              </div>
            )}

            {activeTab !== "notification-settings" && (
              <div
                className="bg-white rounded-lg border border-gray-200 flex flex-col flex-shrink-0"
                style={{ maxHeight: "calc(50vh - 100px)" }}
              >
                <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      {activeTab === "violation-schedule" &&
                        "Violation & Late Fee Schedule (Sample - for reference only) - Please refere your Bylaws and add"}
                      {activeTab === "escalation-policy" &&
                        "Violation & Dues Late Payment Escalation Policy (Sample - for reference only) - Please refere your Bylaws and add"}
                      {activeTab === "amenities-reservations" &&
                        "Reservations, Fees & Deposits (Sample - for reference only) - Please refere your Community rules"}
                    </h2>
                    <div className="flex items-center space-x-4">
                      <button
                        className="px-4 py-2 text-white text-sm font-medium rounded-md whitespace-nowrap cursor-pointer"
                        style={{ backgroundColor: "#1FA372" }}
                      >
                        Sample
                      </button>
                    </div>
                  </div>
                </div>

                <div className="overflow-y-auto flex-1">
                  <div>
                    {activeTab === "violation-schedule" && (
                      <table className="w-full">
                        <thead style={{ backgroundColor: "#DCDCDC" }}>
                          <tr>
                            <th
                              className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
                              style={{ color: "#000000", width: "15%" }}
                            >
                              Type
                            </th>
                            <th
                              className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
                              style={{ color: "#000000", width: "10%" }}
                            >
                              Compliance Period (Days)
                            </th>
                            <th
                              className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
                              style={{ color: "#000000", width: "10%" }}
                            >
                              Response Period (Appeal)
                            </th>
                            <th
                              className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
                              style={{ color: "#000000", width: "8%" }}
                            >
                              Fine ($)
                            </th>
                            <th
                              className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
                              style={{ color: "#000000", width: "10%" }}
                            >
                              Interest Rate (If No Response)
                            </th>
                            <th
                              className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
                              style={{ color: "#000000", width: "15%" }}
                            >
                              Late Fee Policy
                            </th>
                            <th
                              className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
                              style={{ color: "#000000", width: "20%" }}
                            >
                              Notes
                            </th>
                            <th
                              className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider"
                              style={{ color: "#000000", width: "8%" }}
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {sampleViolations.map((violation) => (
                            <tr key={violation.id} className="hover:bg-gray-50">
                              <td className="px-4 py-4 text-base font-medium text-black border-r border-gray-200">
                                {violation.type}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-base font-medium text-black border-r border-gray-200">
                                {violation.compliancePeriod}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-base font-medium text-black border-r border-gray-200">
                                {violation.responsePeriod}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-base font-medium text-black border-r border-gray-200">
                                {violation.fine}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-base font-medium text-black border-r border-gray-200">
                                {violation.interestRate}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-base font-medium text-black border-r border-gray-200">
                                {violation.lateFeePolicy}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-base font-medium text-black border-r border-gray-200">
                                {violation.notes}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-base font-medium text-black">
                                <button
                                  onClick={() =>
                                    handleAddFromSample(violation.id)
                                  }
                                  disabled={isSampleAdded(violation.id)}
                                  className={`px-3 py-1 text-xs font-medium rounded whitespace-nowrap cursor-pointer ${
                                    isSampleAdded(violation.id)
                                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                      : "text-white"
                                  }`}
                                  style={
                                    !isSampleAdded(violation.id)
                                      ? { backgroundColor: "#1FA372" }
                                      : {}
                                  }
                                >
                                  Add
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}

                    {activeTab === "escalation-policy" && (
                      <table className="w-full">
                        <thead style={{ backgroundColor: "#DCDCDC" }}>
                          <tr>
                            <th
                              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
                              style={{ color: "#000000", width: "15%" }}
                            >
                              Notice #
                            </th>
                            <th
                              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
                              style={{ color: "#000000", width: "10%" }}
                            >
                              Action
                            </th>
                            <th
                              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
                              style={{ color: "#000000", width: "35%" }}
                            >
                              Example Calculation (Monthly HOA Fee = $100)
                            </th>
                            <th
                              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider"
                              style={{ color: "#000000", width: "8%" }}
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {sampleEscalations.map((escalation) => (
                            <tr
                              key={escalation.id}
                              className="hover:bg-gray-50"
                            >
                              <td className="px-6 py-4 text-base font-medium text-black border-r border-gray-200">
                                {escalation.noticeNumber}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-black border-r border-gray-200">
                                {escalation.action}
                              </td>
                              <td className="px-6 py-4 text-base font-medium text-black border-r border-gray-200">
                                {escalation.calculation}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-black">
                                <button
                                  onClick={() =>
                                    handleAddFromSample(escalation.id)
                                  }
                                  disabled={isSampleAdded(escalation.id)}
                                  className={`px-3 py-1 text-xs font-medium rounded whitespace-nowrap cursor-pointer ${
                                    isSampleAdded(escalation.id)
                                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                      : "text-white"
                                  }`}
                                  style={
                                    !isSampleAdded(escalation.id)
                                      ? { backgroundColor: "#1FA372" }
                                      : {}
                                  }
                                >
                                  Add
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}

                    {activeTab === "amenities-reservations" && (
                      <table className="w-full">
                        <thead style={{ backgroundColor: "#DCDCDC" }}>
                          <tr>
                            <th
                              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
                              style={{ color: "#000000", width: "15%" }}
                            >
                              Type
                            </th>
                            <th
                              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
                              style={{ color: "#000000", width: "10%" }}
                            >
                              Typical Fee
                            </th>
                            <th
                              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
                              style={{ color: "#000000", width: "10%" }}
                            >
                              Refundable
                            </th>
                            <th
                              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200"
                              style={{ color: "#000000", width: "25%" }}
                            >
                              Notes
                            </th>
                            <th
                              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider"
                              style={{ color: "#000000", width: "8%" }}
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {sampleAmenities.map((amenity) => (
                            <tr key={amenity.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 text-base font-medium text-black border-r border-gray-200">
                                {amenity.type}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-black border-r border-gray-200">
                                {amenity.typicalFee}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-black border-r border-gray-200">
                                {amenity.refundable}
                              </td>
                              <td className="px-6 py-4 text-base font-medium text-black border-r border-gray-200">
                                {amenity.notes}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-black">
                                <button
                                  onClick={() =>
                                    handleAddFromSample(amenity.id)
                                  }
                                  disabled={isSampleAdded(amenity.id)}
                                  className={`px-3 py-1 text-xs font-medium rounded whitespace-nowrap cursor-pointer ${
                                    isSampleAdded(amenity.id)
                                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                      : "text-white"
                                  }`}
                                  style={
                                    !isSampleAdded(amenity.id)
                                      ? { backgroundColor: "#1FA372" }
                                      : {}
                                  }
                                >
                                  Add
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
