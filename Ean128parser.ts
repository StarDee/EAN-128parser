enum DataType {
  Numeric,
  Alphanumeric
}

class AII {
  D: number;

  public constructor(
    public AI: string,
    public Description: string,
    public LengthOfAI: number,
    public DataDescription: DataType,
    public LengthOfData: number,
    public FNC1: boolean
  ) {}

  public toString = (): string => {
    return `${this.AI} [${this.Description}]`;
  }
}

class Aresult {
  public constructor(public value: string, public d: number) {}
}

class NumberRef {
  Value: number;
  constructor(value: number) {
    this.Value = value;
  }
}

export class EAN128Parser {
  aiiDict: { [index: string]: AII } = {};
  aiis: string[];
  minLengthOfAI = 1;
  maxLengthOfAI = 4;
  groutSeperator = 29;
  ean128StartCode = ']C1';
  hasCheckSum = true;
  Add(
    AI: string,
    Description: string,
    LengthOfAI: number,
    DataDescription: DataType,
    LengthOfData: number,
    FNC1: boolean
  ) {
    this.aiiDict[AI] = new AII(
      AI,
      Description,
      LengthOfAI,
      DataDescription,
      LengthOfData,
      FNC1
    );
  }

  constructor() {
    this.Add(
      '00',
      'SerialShippingContainerCode',
      2,
      DataType.Numeric,
      18,
      false
    );
    this.Add('01', 'EAN-NumberOfTradingUnit', 2, DataType.Numeric, 14, false);
    this.Add(
      '02',
      'EAN-NumberOfTheWaresInTheShippingUnit',
      2,
      DataType.Numeric,
      14,
      false
    );
    this.Add('10', 'Charge_Number', 2, DataType.Alphanumeric, 20, true);
    this.Add('11', 'ProducerDate_JJMMDD', 2, DataType.Numeric, 6, false);
    this.Add('12', 'DueDate_JJMMDD', 2, DataType.Numeric, 6, false);
    this.Add('13', 'PackingDate_JJMMDD', 2, DataType.Numeric, 6, false);
    this.Add(
      '15',
      'MinimumDurabilityDate_JJMMDD',
      2,
      DataType.Numeric,
      6,
      false
    );
    this.Add('17', 'ExpiryDate_JJMMDD', 2, DataType.Numeric, 6, false);
    this.Add('20', 'ProductModel', 2, DataType.Numeric, 2, false);
    this.Add('21', 'SerialNumber', 2, DataType.Alphanumeric, 20, true);
    this.Add('22', 'HIBCCNumber', 2, DataType.Alphanumeric, 29, false);
    this.Add(
      '240',
      'PruductIdentificationOfProducer',
      3,
      DataType.Alphanumeric,
      30,
      true
    );
    this.Add('241', 'CustomerPartsNumber', 3, DataType.Alphanumeric, 30, true);
    this.Add(
      '250',
      'SerialNumberOfAIntegratedModule',
      3,
      DataType.Alphanumeric,
      30,
      true
    );
    this.Add(
      '251',
      'ReferenceToTheBasisUnit',
      3,
      DataType.Alphanumeric,
      30,
      true
    );
    this.Add(
      '252',
      'GlobalIdentifierSerialisedForTrade',
      3,
      DataType.Numeric,
      2,
      false
    );
    this.Add('30', 'AmountInParts', 2, DataType.Numeric, 8, true);
    this.Add('310d', 'NetWeight_Kilogram', 4, DataType.Numeric, 6, false);
    this.Add('311d', 'Length_Meter', 4, DataType.Numeric, 6, false);
    this.Add('312d', 'Width_Meter', 4, DataType.Numeric, 6, false);
    this.Add('313d', 'Heigth_Meter', 4, DataType.Numeric, 6, false);
    this.Add('314d', 'Surface_SquareMeter', 4, DataType.Numeric, 6, false);
    this.Add('315d', 'NetVolume_Liters', 4, DataType.Numeric, 6, false);
    this.Add('316d', 'NetVolume_CubicMeters', 4, DataType.Numeric, 6, false);
    this.Add('320d', 'NetWeight_Pounds', 4, DataType.Numeric, 6, false);
    this.Add('321d', 'Length_Inches', 4, DataType.Numeric, 6, false);
    this.Add('322d', 'Length_Feet', 4, DataType.Numeric, 6, false);
    this.Add('323d', 'Length_Yards', 4, DataType.Numeric, 6, false);
    this.Add('324d', 'Width_Inches', 4, DataType.Numeric, 6, false);
    this.Add('325d', 'Width_Feed', 4, DataType.Numeric, 6, false);
    this.Add('326d', 'Width_Yards', 4, DataType.Numeric, 6, false);
    this.Add('327d', 'Heigth_Inches', 4, DataType.Numeric, 6, false);
    this.Add('328d', 'Heigth_Feed', 4, DataType.Numeric, 6, false);
    this.Add('329d', 'Heigth_Yards', 4, DataType.Numeric, 6, false);
    this.Add('330d', 'GrossWeight_Kilogram', 4, DataType.Numeric, 6, false);
    this.Add('331d', 'Length_Meter', 4, DataType.Numeric, 6, false);
    this.Add('332d', 'Width_Meter', 4, DataType.Numeric, 6, false);
    this.Add('333d', 'Heigth_Meter', 4, DataType.Numeric, 6, false);
    this.Add('334d', 'Surface_SquareMeter', 4, DataType.Numeric, 6, false);
    this.Add('335d', 'GrossVolume_Liters', 4, DataType.Numeric, 6, false);
    this.Add('336d', 'GrossVolume_CubicMeters', 4, DataType.Numeric, 6, false);
    this.Add('337d', 'KilogramPerSquareMeter', 4, DataType.Numeric, 6, false);
    this.Add('340d', 'GrossWeight_Pounds', 4, DataType.Numeric, 6, false);
    this.Add('341d', 'Length_Inches', 4, DataType.Numeric, 6, false);
    this.Add('342d', 'Length_Feet', 4, DataType.Numeric, 6, false);
    this.Add('343d', 'Length_Yards', 4, DataType.Numeric, 6, false);
    this.Add('344d', 'Width_Inches', 4, DataType.Numeric, 6, false);
    this.Add('345d', 'Width_Feed', 4, DataType.Numeric, 6, false);
    this.Add('346d', 'Width_Yards', 4, DataType.Numeric, 6, false);
    this.Add('347d', 'Heigth_Inches', 4, DataType.Numeric, 6, false);
    this.Add('348d', 'Heigth_Feed', 4, DataType.Numeric, 6, false);
    this.Add('349d', 'Heigth_Yards', 4, DataType.Numeric, 6, false);
    this.Add('350d', 'Surface_SquareInches', 4, DataType.Numeric, 6, false);
    this.Add('351d', 'Surface_SquareFeet', 4, DataType.Numeric, 6, false);
    this.Add('352d', 'Surface_SquareYards', 4, DataType.Numeric, 6, false);
    this.Add('353d', 'Surface_SquareInches', 4, DataType.Numeric, 6, false);
    this.Add('354d', 'Surface_SquareFeed', 4, DataType.Numeric, 6, false);
    this.Add('355d', 'Surface_SquareYards', 4, DataType.Numeric, 6, false);
    this.Add('356d', 'NetWeight_TroyOunces', 4, DataType.Numeric, 6, false);
    this.Add('357d', 'NetVolume_Ounces', 4, DataType.Numeric, 6, false);
    this.Add('360d', 'NetVolume_Quarts', 4, DataType.Numeric, 6, false);
    this.Add('361d', 'NetVolume_Gallonen', 4, DataType.Numeric, 6, false);
    this.Add('362d', 'GrossVolume_Quarts', 4, DataType.Numeric, 6, false);
    this.Add('363d', 'GrossVolume_Gallonen', 4, DataType.Numeric, 6, false);
    this.Add('364d', 'NetVolume_CubicInches', 4, DataType.Numeric, 6, false);
    this.Add('365d', 'NetVolume_CubicFeet', 4, DataType.Numeric, 6, false);
    this.Add('366d', 'NetVolume_CubicYards', 4, DataType.Numeric, 6, false);
    this.Add('367d', 'GrossVolume_CubicInches', 4, DataType.Numeric, 6, false);
    this.Add('368d', 'GrossVolume_CubicFeet', 4, DataType.Numeric, 6, false);
    this.Add('369d', 'GrossVolume_CubicYards', 4, DataType.Numeric, 6, false);
    this.Add('37', 'QuantityInParts', 2, DataType.Numeric, 8, true);
    this.Add(
      '390d',
      'AmountDue_DefinedValutaBand',
      4,
      DataType.Numeric,
      15,
      true
    );
    this.Add(
      '391d',
      'AmountDue_WithISOValutaCode',
      4,
      DataType.Numeric,
      18,
      true
    );
    this.Add(
      '392d',
      'BePayingAmount_DefinedValutaBand',
      4,
      DataType.Numeric,
      15,
      true
    );
    this.Add(
      '393d',
      'BePayingAmount_WithISOValutaCode',
      4,
      DataType.Numeric,
      18,
      true
    );
    this.Add(
      '400',
      'JobNumberOfGoodsRecipient',
      3,
      DataType.Alphanumeric,
      30,
      true
    );
    this.Add('401', 'ShippingNumber', 3, DataType.Alphanumeric, 30, true);
    this.Add('402', 'DeliveryNumber', 3, DataType.Numeric, 17, false);
    this.Add('403', 'RoutingCode', 3, DataType.Alphanumeric, 30, true);
    this.Add(
      '410',
      'EAN_UCC_GlobalLocationNumber(GLN)_GoodsRecipient',
      3,
      DataType.Numeric,
      13,
      false
    );
    this.Add(
      '411',
      'EAN_UCC_GlobalLocationNumber(GLN)_InvoiceRecipient',
      3,
      DataType.Numeric,
      13,
      false
    );
    this.Add(
      '412',
      'EAN_UCC_GlobalLocationNumber(GLN)_Distributor',
      3,
      DataType.Numeric,
      13,
      false
    );
    this.Add(
      '413',
      'EAN_UCC_GlobalLocationNumber(GLN)_FinalRecipient',
      3,
      DataType.Numeric,
      13,
      false
    );
    this.Add(
      '414',
      'EAN_UCC_GlobalLocationNumber(GLN)_PhysicalLocation',
      3,
      DataType.Numeric,
      13,
      false
    );
    this.Add(
      '415',
      'EAN_UCC_GlobalLocationNumber(GLN)_ToBilligParticipant',
      3,
      DataType.Numeric,
      13,
      false
    );
    this.Add(
      '420',
      'ZipCodeOfRecipient_withoutCountryCode',
      3,
      DataType.Alphanumeric,
      20,
      true
    );
    this.Add(
      '421',
      'ZipCodeOfRecipient_withCountryCode',
      3,
      DataType.Alphanumeric,
      12,
      true
    );
    this.Add(
      '422',
      'BasisCountryOfTheWares_ISO3166Format',
      3,
      DataType.Numeric,
      3,
      false
    );
    this.Add('7001', 'Nato Stock Number', 4, DataType.Numeric, 13, false);
    this.Add('8001', 'RolesProducts', 4, DataType.Numeric, 14, false);
    this.Add(
      '8002',
      'SerialNumberForMobilePhones',
      4,
      DataType.Alphanumeric,
      20,
      true
    );
    this.Add(
      '8003',
      'GlobalReturnableAssetIdentifier',
      4,
      DataType.Alphanumeric,
      34,
      true
    );
    this.Add(
      '8004',
      'GlobalIndividualAssetIdentifier',
      4,
      DataType.Numeric,
      30,
      true
    );
    this.Add('8005', 'SalesPricePerUnit', 4, DataType.Numeric, 6, false);
    this.Add(
      '8006',
      'IdentifikationOfAProductComponent',
      4,
      DataType.Numeric,
      18,
      false
    );
    this.Add('8007', 'IBAN', 4, DataType.Alphanumeric, 30, true);
    this.Add(
      '8008',
      'DataAndTimeOfManufacturing',
      4,
      DataType.Numeric,
      12,
      true
    );
    this.Add(
      '8018',
      'GlobalServiceRelationNumber',
      4,
      DataType.Numeric,
      18,
      false
    );
    this.Add(
      '8020',
      'NumberBillCoverNumber',
      4,
      DataType.Alphanumeric,
      25,
      false
    );
    this.Add(
      '8100',
      'CouponExtendedCode_NSC_offerCcode',
      4,
      DataType.Numeric,
      10,
      false
    );
    this.Add(
      '8101',
      'CouponExtendedCode_NSC_offerCcode_EndOfOfferCode',
      4,
      DataType.Numeric,
      14,
      false
    );
    this.Add('8102', 'CouponExtendedCode_NSC', 4, DataType.Numeric, 6, false);
    this.Add(
      '90',
      'InformationForBilateralCoordinatedApplications',
      2,
      DataType.Alphanumeric,
      30,
      true
    );
    // Add("91", "Company specific", 2, DataType.Alphanumeric, 30, true);
    // Add("92", "Company specific", 2, DataType.Alphanumeric, 30, true);
    // Add("93", "Company specific", 2, DataType.Alphanumeric, 30, true);
    // Add("94", "Company specific", 2, DataType.Alphanumeric, 30, true);
    // Add("95", "Company specific", 2, DataType.Alphanumeric, 30, true);
    // Add("96", "Company specific", 2, DataType.Alphanumeric, 30, true);
    // Add("97", "Company specific", 2, DataType.Alphanumeric, 30, true);
    // Add("98", "Company specific", 2, DataType.Alphanumeric, 30, true);
    // Add("99", "Company specific", 2, DataType.Alphanumeric, 30, true);
    this.aiis = this.getKeys();

    this.minLengthOfAI = this.getValues().reduce((a, b) =>
      a.LengthOfAI < b.LengthOfAI ? a : b
    ).LengthOfAI;
    this.maxLengthOfAI = this.getValues().reduce((a, b) =>
      a.LengthOfAI > b.LengthOfAI ? a : b
    ).LengthOfAI;
  }

  getValues(): AII[] {
    const values: AII[] = [];

    for (const key in this.aiiDict) {
      if (this.aiiDict[key]) {
        values.push(this.aiiDict[key]);
      }
    }

    return values;
  }

  getKeys() {
    const keys: string[] = [];

    for (const key in this.aiiDict) {
      if (key) {
        keys.push(key);
      }
    }

    return keys;
  }

  /// <summary>
  /// Parse the ean128 code
  /// </summary>
  /// <param name="data">The raw scanner data</param>
  /// <param name="throwException">If an exception will be thrown if an AI cannot be found</param>
  /// <returns>The different parts of the ean128 code</returns>
  public Parse(
    data: string,
    throwException: boolean = false
  ): [AII, Aresult][] {
    // cut off the EAN128 start code
    if (data.startsWith(this.ean128StartCode)) {
      data = data.substr(this.ean128StartCode.length);
    }
    // cut off the check sum
    if (this.hasCheckSum) {
      data = data.substr(0, data.length - 2);
    }

    const result: [AII, Aresult][] = [];
    const index = new NumberRef(0);
    // walkk through the EAN128 code

    while (index.Value < data.length) {
      // try to get the AI at the current position
      const ai = this.GetAI(data, index);

      if (ai == null) {
        if (throwException) {
          throw new Error('AI not found');
        }
        return result;
      }

      const d = ai.D;
      ai.D = 0;
      // get the data to the current AI
      const code = this.GetCode(data, ai, index);
      result.push([ai, new Aresult(code, d)]);
    }

    return result;
  }

  /// <summary>
  /// Try to get the AI at the current position
  /// </summary>
  /// <param name="data">The row data from the scanner</param>
  /// <param name="index">The refrence of the current position</param>
  /// <param name="usePlaceHolder">Sets if the last character of the AI should replaced with a placehoder ("d")</param>
  /// <returns>The current AI or null if no match was found</returns>
  GetAI(data: string, index: NumberRef, usePlaceHolder: boolean = false): AII {
    let result: AII = null;
    // Step through the different lenghts of the AIs
    for (let i = this.minLengthOfAI; i <= this.maxLengthOfAI; i++) {
      // get the AI sub string
      let ai = data.substr(index.Value, i);

      const d = this.TryParseInt(ai[ai.length - 1], 0);

      if (usePlaceHolder) {
        ai = ai.substr(0, ai.length - 1) + 'd';
      }

      result = this.TryGetValue(ai);
      // try to get the ai from the dictionary
      if (result) {
        if (usePlaceHolder) {
          result.D = d;
        }
        // Shift the index to the next
        index.Value += i;
        return result;
      }
      // if no AI found, try it with the next lenght
    }
    // if no AI found here, than try it with placeholders. Assumed that is the first sep where usePlaceHolder is false
    if (!usePlaceHolder) {
      result = this.GetAI(data, index, true);
    }
    return result;
  }

  TryGetValue(str: string): AII {
    return this.aiiDict[str];
  }

  /// <summary>
  /// Get the current code to the AI
  /// </summary>
  /// <param name="data">The row data from the scanner</param>
  /// <param name="ai">The current AI</param>
  /// <param name="index">The refrence of the current position</param>
  /// <returns>the data to the current AI</returns>
  GetCode(data: string, ai: AII, index: NumberRef): string {
    // get the max lenght to read.
    let lenghtToRead = Math.min(ai.LengthOfData, data.length - index.Value);
    // get the data of the current AI
    let result = data.substr(index.Value, lenghtToRead);
    // check if the AI support a group seperator
    if (ai.FNC1) {
      // try to find the index of the group seperator
      const indexOfGroupTermination = this.getIndexGroutSeperator(result);
      if (indexOfGroupTermination >= 0) {
        lenghtToRead = indexOfGroupTermination + 1;
      }
      // get the data of the current AI till the gorup seperator
      result = data.substr(index.Value, lenghtToRead);
    }

    // Shift the index to the next
    index.Value += lenghtToRead;
    return result;
  }

  getIndexGroutSeperator(s: string): number {
    for (let index = 0; index < s.length; index++) {
      if (s.charCodeAt(index) === this.groutSeperator) {
        return index;
      }
    }
    return -1;
  }

  TryParseInt(str, defaultValue) {
    let retValue = defaultValue;
    if (str !== null) {
      if (str.length > 0) {
        if (!isNaN(str)) {
          retValue = parseInt(str, 10);
        }
      }
    }
    return retValue;
  }
}
